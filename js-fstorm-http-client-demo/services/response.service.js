class ResponseService {
  constructor() {

  }

  success(data) {
    !data && (data = {});
    return {
      code: 0, data,
      message: 'success',
    };
  }

  error(e) {
    return {
      code: 500,
      message: typeof e === 'object' ?
        (e.message || e.toString()) : (e || '系统异常'),
      data: {},
    };
  }

  logout() {
    return {
      code: 401, message: '访问未授权', data: {},
    };
  }
}

module.exports = ResponseService;







