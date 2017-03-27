from channels import Group
from mainpage.models import Todo
import json
from django.core import serializers


def ws_message(message):
    json_data = json.loads(message.content.get('text', ''))
    if json_data:
        action = json_data.get('action', '')
        if action == 'add':
            todo = Todo(name=json_data.get('data'))
            todo.save()
            Group("todo").send({
                "text": '{"action":"add", "data": ' + serializers.serialize('json', [todo]) + '}'
            })
        elif action == 'del':
            Todo.objects.filter(pk=json_data.get('data')).delete()
            Group("todo").send({
                "text": '{"action":"del", "data": ' + json_data.get('data') + '}'
            })

def ws_connect(message):
    message.reply_channel.send(
        {
        "accept": True,
        "text": '{"action":"add", "data": ' + serializers.serialize('json', Todo.objects.all().order_by('date')) + '}'
        }
    )
    Group('todo').add(message.reply_channel)


def ws_disconnect(message):
    Group('todo').discard(message.reply_channel)