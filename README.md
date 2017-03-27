# Todoapp with Channels and Redis

This app use channel as a new layer to use websockets with django, with redis as the router of our task in the ASGI enviroment

If you want to read more about channels, you can go [here](https://channels.readthedocs.io/en/stable/index.html)

Now for this app we are going to install python3 and virtualenv

```
brew install python3
```
```
pip install virtualenv
```

If you don't have brew installed you can check [here](https://brew.sh/)

With python3 you already have pip installed

Go to the root of the project (cd myproject) and just run the following commands:

```
virtualenv -p python3 venv
source venv/bin/activate
```
Now you can see, (venv) in the console, we are on the virtualenv lets go and install all the requirements

```
pip install -r requirements.txt
```

You also need to have redis-server running:
```
brew install redis
```
and run on a new terminal:
```
redis-server /usr/local/etc/redis.conf
```
That's all you need, now just run the app:
```
python manage.py runserver
```

If you have any doubts or improve just make an issue or pull requests, also you can contact me on juanmigabarron@gmail.com
