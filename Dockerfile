# dist/ is gitignored, so the image builds it; only dist/ is served (not the PRD or scripts).
FROM node:22-alpine AS build
WORKDIR /site
COPY . .
RUN node build.mjs && node check-brew.mjs && node check-site.mjs

FROM nginx:1.27-alpine
COPY --from=build /site/dist /usr/share/nginx/html
# nginx serves uncompressed by default; Three.js alone is 650KB raw, under 200KB gzipped.
RUN echo "gzip on; gzip_types text/css application/javascript image/svg+xml;" > /etc/nginx/conf.d/gzip.conf
