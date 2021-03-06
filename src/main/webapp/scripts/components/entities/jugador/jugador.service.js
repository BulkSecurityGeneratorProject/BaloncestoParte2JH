'use strict';

angular.module('ligaBaloncestoApp')
    .factory('Jugador', function ($resource, DateUtils) {
        return $resource('api/jugadors/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fechaNacimiento = DateUtils.convertLocaleDateFromServer(data.fechaNacimiento);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.fechaNacimiento = DateUtils.convertLocaleDateToServer(data.fechaNacimiento);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.fechaNacimiento = DateUtils.convertLocaleDateToServer(data.fechaNacimiento);
                    return angular.toJson(data);
                }
            },
            'consultarCanastas': {
                method: 'GET', isArray: true, url:'api/jugadorsURL/:consultarCanastas' //jugadorsURL puede ser el que sea
            },
            'EquipoconsultarCanastas': {
            method: 'GET', isArray: true, url:'api/equipos/:consultarEnEquipo/jugadorasos/:consultarCanastasos'
        },
        });
    });
