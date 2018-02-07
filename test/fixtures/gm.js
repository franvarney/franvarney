exports.get = {
  'service': 'getVehicleInfo',
  'status': '200',
  'data': {
    'vin': {
      'type': 'String',
      'value': '123'
    },
    'color': {
      'type': 'String',
      'value': 'Color'
    },
    'fourDoorSedan': {
      'type': 'Boolean',
      'value': 'False'
    },
    'twoDoorCoupe': {
      'type': 'Boolean',
      'value': 'True'
    },
    'driveTrain': {
      'type': 'String',
      'value': 'v1'
    }
  }
};

exports.badGet = {
  'status': '404',
  'reason': 'Vehicle id: 2 not found.'
};

exports.security = {
  'service': 'getSecurityStatus',
  'status': '200',
  'data': {
    'doors': {
      'type': 'Array',
      'values': [
        {
          'location': {
            'type': 'String',
            'value': 'frontLeft'
          },
          'locked': {
            'type': 'Boolean',
            'value': 'False'
          }
        },
        {
          'location': {
            'type': 'String',
            'value': 'frontRight'
          },
          'locked': {
            'type': 'Boolean',
            'value': 'True'
          }
        }
      ]
    }
  }
};
