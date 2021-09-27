FROM ruby:2.7-alpine

RUN gem install rake

RUN set -ex  \
    && apk add --update \
        nodejs \
        shared-mime-info \
    && apk add --virtual build-dependencies \
           build-base \
           ruby-dev \
    && gem install zendesk_apps_tools \
    && rm -rf /var/cache/apk/* 

WORKDIR /app

# For dev testing is needed to copy settings.json file to src/ directory and run:
# CMD ["zat", "server", "--path", "src/", "--bind", "0.0.0.0", "-c", "settings.json"]

# CMD ["ls"]
CMD ["zat", "server", "--path", "./", "--bind", "0.0.0.0", "--app-id=360003544678"]

EXPOSE 4567