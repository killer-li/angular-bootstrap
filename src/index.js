require('./css/directive.css');

require('./ourpalm-util/ourpalm-util-directive');
require('./ourpalm-util/ourpalm-util-filter');
require('./ourpalm-util/ourpalm-util-http');

require('./ourpalm-service/ourpalm-service');

require('./ourpalm-app/ourpalm-app');

require('./ourpalm-controller/InoicScrollController');

angular.bootstrap(document, ['app']);