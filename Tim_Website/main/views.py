from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect


def main(request):
    return render(request,'main/index.html')