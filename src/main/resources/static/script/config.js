(function (angular) {

    const arkanoid = angular.module('arkanoid');
    const baseUrl = window.location.href.replace(/(https?:\/\/.+?\/).*/, '$1');

    arkanoid.constant('arkanoidConfig', {
        baseUrl: baseUrl,
        apiBaseUrl: baseUrl + 'api'
    });

    arkanoid.config(['RestangularProvider', 'arkanoidConfig', function (RestangularProvider, arkanoidConfig) {
        RestangularProvider.setBaseUrl(arkanoidConfig.apiBaseUrl);

        RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
            var returnData = data;
            if (operation == 'getList' && '_embedded' in data) {
                returnData = [];

                for (var key in data['_embedded']) {
                    returnData = returnData.concat(data['_embedded'][what]);
                }

                returnData['_page'] = data.page;
            }
            return returnData;
        });

        RestangularProvider.setOnElemRestangularized(function (elem, isCollection, what, Restangular) {
            if (!isCollection) {
                elem.addLink = function (route, link) {
                    return elem.post(route, link, undefined, {'Content-Type': 'text/uri-list'});
                };
            }
            return elem;
        });

        RestangularProvider.setRestangularFields({selfLink: "_links.self.href"});
    }]);

})(window.angular);