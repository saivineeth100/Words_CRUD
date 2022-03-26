from django.shortcuts import render


from rest_framework import generics, status, mixins
from rest_framework_simplejwt.views import TokenViewBase
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework.response import Response


from api.serializer import UserSerializer,SignUpSerializer

class CRUDAPIView(generics.CreateAPIView,generics.RetrieveUpdateDestroyAPIView):

    def get_queryset(self):
        return self.model.objects.all()

    
    def get_serializer(self, *args, **kwargs):
        """ 
        if an array is passed, set serializer to many 
        Enables to create Multiple items 
        """
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        return super().get_serializer(*args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        response.data = {'status': 'Deleted successfully'}
        return response


class ListModelMixin(mixins.ListModelMixin):
    
    def get(self, request, *args, **kwargs):
        urlparams = list(self.kwargs.keys())
        if len(urlparams) > 0:
            self.lookup_field = urlparams[0]
            return self.retrieve(request, *args, **kwargs)
        else:
            maxobjectsperpage = self.request.query_params.get("max",None)
            if self.paginator is not None:
                self.paginator.page_size = maxobjectsperpage if maxobjectsperpage is not None else self.paginator.page_size
            return self.list(request, *args, **kwargs)

    def get_paginated_response(self, data):
        response = super().get_paginated_response(data)
        # To get Totalpages count
        response.data['total_pages'] = self.paginator.page.paginator.num_pages
        return response



class LoginView(TokenViewBase):
    
    serializer_class = TokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            userdata = UserSerializer(serializer.user).data
        except TokenError as e:
            raise InvalidToken(e.args[0])
        response = Response(
            {
                "tokens": {**serializer.validated_data},
                "user": {**userdata},
            },
            status=status.HTTP_200_OK,
        )
        return response

class SignupView(generics.GenericAPIView):
    serializer_class = SignUpSerializer
    permission_classes = []
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.addnewuser()
        return Response(
            {"status": "account created sucessfully"}, status=status.HTTP_200_OK
        )   