from django.shortcuts import render, HttpResponse, redirect 
from django.core.urlresolvers import reverse
from apps.note.models import Posts
from django import forms

def index(request):
    context = {
        'posts': Posts.objects.all(),
    }

    return render(request, 'note/index.html', context)

def process(request):
    Posts.objects.create(content=request.POST['content'])

    context = {
        'posts': Posts.objects.all(),
    }

    return render(request, 'note/posts_index.html', context)

def delete(request, id):
    Posts.objects.filter(id=id).delete()

    context = {
        'posts': Posts.objects.all(),
    }

    return render(request, 'note/posts_index.html', context)

def update(request, id):
    print ('got here')
    toUpdate = Posts.objects.get(id=id)
    toUpdate.content = request.POST['update']
    toUpdate.save()
    
    context = {
        'posts': Posts.objects.all(),
    }

    return render(request, 'note/posts_index.html', context)