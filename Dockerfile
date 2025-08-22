FROM node:12-alpine as uibuild

RUN apk --no-cache add make



COPY . /GaoCloud-UI
RUN cd /GaoCloud-UI && make build

FROM alpine:latest

ARG version
ARG buildtime
ARG branch

LABEL ui.gaocloud/version=$version ui.gaocloud/buildtime=$buildtime ui.gaocloud/branch=$branch

COPY --from=uibuild /GaoCloud-UI/packages/ui/build /www

WORKDIR /www
