FROM python:3.8.2-alpine3.11

RUN mkdir /people_manager

RUN mkdir /var/log/people_manager

COPY ./requirements.txt /people_manager

RUN pip install -r /people_manager/requirements.txt

COPY people_manager/ /people_manager/

WORKDIR /people_manager

CMD ["gunicorn", "-c", "app_gunicorn.py", "src.app:app" ]


