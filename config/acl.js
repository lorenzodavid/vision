const Acl = require('acl');
const Redis = require('redis')
const config = require('config')
const RedisHost = config.get('redis.host');
const RedisPort = config.get('redis.port');
const AclPrefix = config.get('acl.prefix');

var redis = Redis.createClient(
    RedisPort,
    RedisHost
)

var acl = new Acl(
    new Acl.redisBackend(
	redis,
	AclPrefix
    ));

var promise = [
    acl.addUserRoles('lorenzodavid91@gmail.com', 'admin'),
    acl.addUserRoles('lorenzod@plumgrid.com', 'guest'),
    acl.allow('admin', ['*'], ['view', 'delete']),
    acl.allow('guest', ['*'], ['view'])
]

Promise.all(promise).then(
    ()=>{
	redis.quit();
    });
