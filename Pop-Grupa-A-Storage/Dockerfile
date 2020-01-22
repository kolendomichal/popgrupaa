FROM python:3.7-alpine

WORKDIR /app

#Copy list of libraries needed to install
COPY requirements.txt .
COPY entrypoint.sh .

#upgrade pip and install libraries
RUN apk update && apk add postgresql-dev gcc libffi-dev python3-dev musl-dev
RUN pip install --upgrade --quiet pip --no-cache-dir -r requirements.txt

#expose port 5030
EXPOSE 8000

RUN ls -la

RUN chmod a+x entrypoint.sh

CMD [ "/bin/sh", "entrypoint.sh" ]



