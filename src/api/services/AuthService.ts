/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoggedInUserDto } from '../models/LoggedInUserDto';
import type { LoginUserDto } from '../models/LoginUserDto';
import type { UserDto } from '../models/UserDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Đăng nhập và nhận token JWT.
     * @returns LoggedInUserDto Thành công
     * @throws ApiError
     */
    public static authControllerLogin({
        requestBody,
    }: {
        requestBody: LoginUserDto,
    }): CancelablePromise<LoggedInUserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Dữ liệu không hợp lệ - một số thông tin bị thiếu hoặc không đúng định dạng`,
                401: `Email hoặc mật khẩu không đúng`,
                500: `Bug! Hãy báo cáo lỗi này cho quản trị viên trang web.`,
            },
        });
    }
    /**
     * Lấy thông tin người dùng đang đăng nhập (tương ứng với JWT token gửi lên).
     * @returns UserDto Thành công
     * @throws ApiError
     */
    public static authControllerGetProfile(): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/profile',
            errors: {
                400: `Dữ liệu không hợp lệ - một số thông tin bị thiếu hoặc không đúng định dạng`,
                401: `Bạn chưa đặt bearer token (JWT) hợp lệ.`,
                500: `Bug! Hãy báo cáo lỗi này cho quản trị viên trang web.`,
            },
        });
    }
}
