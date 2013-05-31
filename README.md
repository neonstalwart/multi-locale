#multi-locale

## description
This is a demo app to show how `map` can be used to serve unique locales to each request.

## getting started

```sh
git clone --recursive git@github.com:neonstalwart/multi-locale.git
node multi-locale
```

then visit:

* http://127.0.0.1:1337/
* http://127.0.0.1:1337/ja-jp
* http://127.0.0.1:1337/fr
* http://127.0.0.1:1337/es

the locale is detected based on the path of the request and it's very brittle - this is just a demo!