import datetime
import os
from fastapi import HTTPException, Depends
from typing import Annotated
from starlette import status
from ..model.database import begin
from dotenv import load_dotenv
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from postmarker.core import PostmarkClient
from jose import jwt, JWTError
from ..model.model import UserModel


load_dotenv()
postmark = PostmarkClient(server_token=os.getenv('POSTMARK'))
conf = os.getenv('FROM')


def get_db():
    db = begin()
    try:
        yield db
    finally:
        db.close()


hashed = CryptContext(schemes=['bcrypt'])
SECRET = 'Testing'
Algorithm = 'HS256'


def authorization(username: str, password: str, db):
    user = db.query(UserModel).filter(UserModel.username == username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid Credentials!')
    password = hashed.verify(password, user.password)
    if not password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid Credentials!')
    return user


def authentication(user_id: int, username: str, is_admin: bool, limit):
    encode = {'sub': username, 'id': user_id, 'admin': is_admin}
    exp = datetime.datetime.now() + limit
    encode.update({'exp': exp})
    return jwt.encode(encode, SECRET, algorithm=Algorithm)


bearer = OAuth2PasswordBearer(tokenUrl='user/login')


async def get_user(token: Annotated[str, Depends(bearer)]):
    try:
        payload = jwt.decode(token, SECRET, algorithms=[Algorithm])
        username: str = payload.get('sub')
        user_id: int = payload.get('id')
        admin: bool = payload.get('admin')
        if username is None or user_id is None or admin is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Unauthorized user')
        return {
            'username': username,
            'user_id': user_id,
            'admin': admin
        }

    except JWTError as e:
        print(f'An error occurred as: {e}')
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='logged out due to inactivity')


def send_email(user_email, html_body, body, subject):
    response = postmark.emails.send(
        From=conf,
        To=user_email,
        Subject=subject,
        HtmlBody=html_body,
        TextBody=body,
        MessageStream='outbound'
    )

    if response['ErrorCode'] == 0:
        return True
    else:
        return False
