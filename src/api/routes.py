"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)


@api.route('/signup', methods=['POST'])
def signup():
    response_body= request.get_json()
    user = User(email=response_body["email"], password=response_body["password"])
    db.session.add(user)
    db.session.commit()

    return jsonify(user.serialize()), 200


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != email or password != password:
        return jsonify({"msg": "Bad email or password"}), 401
    else:    
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    return jsonify({"email":user.email}), 200


    