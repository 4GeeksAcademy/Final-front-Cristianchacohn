"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Posts, Comments, Medias, Followers, Characters, CharacterFavorites, Planets, PlanetFavorites
import requests

api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['POST, GET'])
def handle_hello():
    response_body = {}
    response_body["message"] = "Hello"
    return jsonify(response_body), 200


@api.route('/users', methods=['GET'])
def users():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        result = [ row.serialize() for row in rows ]
        response_body['message'] = 'Usuarios'
        response_body['results'] = result
        return response_body, 200


@api.route('/followers', methods=['GET, POST'])
def followers():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Followers)).scalars()
        result = [ row.serialize() for row in rows ]
        response_body['message'] = 'Seguidores'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        follower = Followers(
            following_id = data.get('following_id'),
            follower_id = data.get('follower_id')),
        db.session.add(follower)
        db.session.commit()
        response_body['message'] = 'empezó a seguir'
        response_body['results'] = follower.serialize()
        return response_body, 200


@api.route('/comments', methods=['GET, POST'])
def comments():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Comments)).scalars()
        result = [ row.serialize() for row in rows ]
        response_body['message'] = 'Comments'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        comment = Comments(
            body = data.get('body'),
            user_id = data.get('user_id'),
            post_id = data.get('post_id')),
        db.session.add(comment)
        db.session.commit()
        response_body['message'] = 'comentario creado'
        response_body['results'] = comment.serialize()
        return response_body, 200
    

@api.route('/medias', methods=['GET, POST'])
def medias():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Medias)).scalars()
        result = [ row.serialize() for row in rows ]
        response_body['message'] = 'Medias'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        media = Medias(
            media_type = data.get('media_type'),
            url = data.get('url'),
            post_id = data.get('post_id')),
        db.session.add(media)
        db.session.commit()
        response_body['message'] = 'Media creada correctamente'
        response_body['results'] = media.serialize()
        return response_body, 200


@api.route('/posts', methods=['GET', 'POST'])
def posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()
        result = [ row.serialize() for row in rows ]
        response_body['message'] = 'Listado de todas las publicaciones (de todos los usuarios)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Posts(title=data.get('title'),
                    description=data.get('description'),
                    body=data.get('body', 'body por defecto cuando hay un error'),
                    image_url=data['image_url'],
                    user_id=data['user_id'])
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'El post ha sido publicado correctamente'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def post(id):
    response_body = {}
    row = db.session.execute(db.select(Posts).where(Posts.id == id)).scalar()
    if not row:
        response_body['message'] =  f'La publicación con id: {id} no existe en nuestro registos'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.title = data['title']
        row.description = data['description']
        row.body = data['body']
        row.image_url = data['image_url']
        row.user_id = data['user_id']
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200
    

@api.route('/comments/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def comment(id):
    response_body = {}
    row = db.session.execute(db.select(Comments).where(Comments.id == id)).scalar()
    if not row:
        response_body['message'] =  f'El comentario con id: {id} no existe en nuestro registos'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.title = data['title']
        row.description = data['description']
        row.body = data['body']
        row.image_url = data['image_url']
        row.user_id = data['user_id']
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200




@api.route('/followers/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def follower(id):
    response_body = {}
    row = db.session.execute(db.select(Followers).where(Followers.id == id)).scalar()
    if not row:
        response_body['message'] =  f'El seguidor con id: {id} no existe en nuestro registos'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.body = data.get('body')
        row.follower_id = data.get('follower_id')
        row.following_id = data.get('following_id')
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200


@api.route('/medias/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def media(id):
    response_body = {}
    row = db.session.execute(db.select(Medias).where(Medias.id == id)).scalar()
    if not row:
        response_body['message'] =  f'el aarchivo multimedia con id: {id} no existe en nuestro registos'
        return response_body, 400
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.media_type = data.get('media_type')
        row.body = data.get('body')
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Respuesta desde el {request.method} para el id: {id}'
        return response_body, 200


@api.route('/characters', methods=['GET'])
def characters():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Characters)).scalars()
        response_body['message'] = 'Personajes'
        response_body['results'] = [row.serialize() for row in rows]
        return response_body, 200


@api.route('/swapi/characters', methods=['GET'])
def characters_swapi():
    response_body = {}
    url = 'https://swapi.tech/api/people'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        response_body['message'] = 'Personajes importados de la SWAPI'
        next = data.get('next')
        while True:
            results = data['results']
            for result in results:
                character_response = requests.get(result['url'])
                if character_response.status_code == 200:
                    character_data = character_response.json().get('result').get('properties')
                    character = Characters(
                        id = character_data.get('id'),
                        name = character_data.get('name'),
                        height = character_data.get('height'),
                        mass = character_data.get('mass'),
                        eye_color = character_data.get('eye_color'),
                        hair_color = character_data.get('hair_color'),
                        skin_color = character_data.get('skin_color'),
                        birth_year = character_data.get('birth_year'),
                        gender = character_data.get('gender'))
                    db.session.add(character)
                else:
                    response_body['message'] = 'error al importar al personaje desde swapi'
                    db.session.rollback()
            if next is None:
                    break
            else:
                next_response = requests.get(next)
                data = next_response.json()
                next = data.get('next')
        db.session.commit()
        return response_body, 200
    return response_body, 400   


@api.route('/character-favorites', methods=['GET', 'POST'])
def character_favorites():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(CharacterFavorites)).scalars()
        response_body['message'] = 'tus personajes favoritos'
        response_body['results'] = [row.serialize() for row in rows]
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        character_favorite = CharacterFavorites(
            user_id = data.get('user_id'),
            character_id = data.get('character_id')
        )
        db.session.add(character_favorite)
        db.session.commit()
        response_body['message'] = 'Personaje favorito creado correctamente'
        response_body['results'] = character_favorite.serialize()
        return response_body, 200


@api.route('/character-favorites/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def character_favorite(id):
    response_body = {}
    row = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.id == id)).scalar()
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Registro con id: {id}'
        return response_body, 200
    if not row:
        response_body['message'] =  f'El registro con id: {id} no existe'
        return response_body, 400
    if request.method == 'PUT':
        data = request.json
        row.user_id = data.get('user_id')
        row.character_id = data.get('character_id')
        db.session.commit()
        response_body['message'] = f'Actualizado el registro con id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Eliminado el registro con id: {id}'
        return response_body, 200


@api.route('/Planets', methods=['GET'])
def planets():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(planets)).scalars()
        response_body['message'] = 'Planetas'
        response_body['results'] = [row.serialize() for row in rows]
        return response_body, 200
    

@api.route('/swapi/planets', methods=['GET'])
def planets_swapi():
    response_body = {}
    url = 'https://swapi.tech/api/planets'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        response_body['message'] = 'Listado de planetas importados de la SWAPI'
        next = data.get('next')
        while True:
            results = data['results']
            for result in results:
                planet_response = requests.get(result['url'])
                if planet_response.status_code == 200:
                    planet_data = planet_response.json().get('result').get('properties')
                    planet = Planets(
                        id = planet_data.get('id'),
                        name = planet_data.get('name'),
                        diameter = planet_data.get('diameter'),
                        rotation_period = planet_data.get('rotation_period'),
                        orbital_period = planet_data.get('orbital_period'),
                        gravity = planet_data.get('gravity'),
                        population = planet_data.get('population'),
                        climate = planet_data.get('climate'),
                        terrain = planet_data.get('terrain'))
                    db.session.add(planet)
                else:
                    response_body['message'] = 'error al importar planetas desde swapi'
                    db.session.rollback()
            if next is None:
                break
            else:
                next_response = requests.get(next)
                data = next_response.json()
                next = data.get('next')
        db.session.commit()
        return response_body, 200
    return response_body, 400

@api.route('/planet-favorites/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def planet_favorite(id):
    response_body = {}
    row = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.id == id)).scalar()
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Registro con id: {id}'
        return response_body, 200
    if not row:
        response_body['message'] =  f'El registro con id: {id} no existe'
        return response_body, 400
    if request.method == 'PUT':
        data = request.json
        row.user_id = data.get('user_id')
        row.planet_id = data.get('planet_id')
        db.session.commit()
        response_body['message'] = f'Actualizado el registro con id: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Eliminado el registro con id: {id}'
        return response_body, 200