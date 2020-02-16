export enum RoutesHttp {
  BASE = 'http://127.0.0.1:3000/api/',

  // Auth
  SIGN_IN = 'auth/login',
  SIGN_UP = 'auth/register',
  LOGOUT = 'auth/logout',
  PASSWORD_RESET = 'auth/password-reset',
  CHANGE_PASSWORD = 'auth/password-new',

  // Admin
  LIST_USERS = 'admin/list-users',
  LIST_USERS_TRASHED = 'admin/list-users-trashed',
  CREATE_ADMIN = 'admin/create-admin',
  CREATE_USER = 'admin/create-user',
  DELETE_USER = 'admin/delete-user',
  RESTORE_USER = 'admin/restore-user',

  // Crop
  CROP_LIST = 'crop/list',
  CROP_LIST_TRASHED = 'crop/list-trashed',
  CROP_CREATE = 'crop/create',
  CROP_UPDATE = 'crop/update',
  CROP_DELETE = 'crop/delete',
  CROP_RESTORE = 'crop/restore',

  // Texture
  TEXTURE_LIST = 'textures/list',
  TEXTURE_LIST_TRASHED = 'textures/list-trashed',
  TEXTURE_CREATE = 'textures/create',
  TEXTURE_UPDATE = 'textures/update',
  TEXTURE_DELETE = 'textures/delete',
  TEXTURE_RESTORE = 'textures/restore',

  // Account
  ACCOUNT_UPDATE = "users/update-user",

  // Weather
  WEATHER_LIST = 'weather/list',
  WEATHER_LIST_TRASHED = 'weather/list-trashed',
  WEATHER_CREATE = 'weather/create',
  WEATHER_UPDATE = 'weather/update',
  WEATHER_DELETE = 'weather/delete',
  WEATHER_RESTORE = 'weather/restore',

  // Sector
  SECTOR_LIST = 'sectors/list',
  SECTOR_LIST_TRASHED = 'sectors/list-trashed',
  SECTOR_CREATE = 'sectors/create',
  SECTOR_UPDATE = 'sectors/update',
  SECTOR_DELETE = 'sectors/delete',
  SECTOR_RESTORE = 'sectors/restore',

  // Location
  LOCATION_LIST = 'locations/list',
  LOCATION_LIST_TRASHED = 'locations/list-trashed',
  LOCATION_CREATE = 'locations/create',
  LOCATION_CREATE_MANY = 'locations/create-many',
  LOCATION_UPDATE = 'locations/update',
  LOCATION_DELETE = 'locations/delete',
  LOCATION_RESTORE = 'locations/restore',
}
