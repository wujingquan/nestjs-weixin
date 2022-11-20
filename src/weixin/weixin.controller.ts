import { Controller, Get, Query, Redirect } from '@nestjs/common';

@Controller('weixin')
export class WeixinController {
  @Get()
  @Redirect()
  auth(@Query('type') type) {
    const appId = '';
    const redirectUrl = '';
    const url =
      'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
      appId +
      '&redirect_uri=' +
      redirectUrl +
      '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
    return {
      url,
    };
  }
}
