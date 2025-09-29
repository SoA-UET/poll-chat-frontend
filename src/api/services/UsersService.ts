/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { PatchUserDTO } from '../models/PatchUserDTO';
import type { PutUserDto } from '../models/PutUserDto';
import type { UserDto } from '../models/UserDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Lấy danh sách tất cả người dùng trong hệ thống.
     * @returns UserDto Thành công
     * @throws ApiError
     */
    public static usersControllerFindAll(): CancelablePromise<Array<UserDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
            errors: {
                400: `Dữ liệu không hợp lệ - một số thông tin bị thiếu hoặc không đúng định dạng`,
                500: `Bug! Hãy báo cáo lỗi này cho quản trị viên trang web.`,
            },
        });
    }
    /**
     * Đăng ký tài khoản người dùng mới.
     * @returns UserDto Thành công
     * @throws ApiError
     */
    public static usersControllerCreate({
        requestBody,
    }: {
        requestBody: CreateUserDto,
    }): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Dữ liệu không hợp lệ - một số thông tin bị thiếu hoặc không đúng định dạng`,
                500: `Bug! Hãy báo cáo lỗi này cho quản trị viên trang web.`,
            },
        });
    }
    /**
     * Lấy thông tin người dùng theo ID.
     * @returns UserDto Thành công
     * @throws ApiError
     */
    public static usersControllerFindById({
        id,
    }: {
        id: string,
    }): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Dữ liệu không hợp lệ - một số thông tin bị thiếu hoặc không đúng định dạng`,
                404: `Không tìm thấy người dùng`,
                500: `Bug! Hãy báo cáo lỗi này cho quản trị viên trang web.`,
            },
        });
    }
    /**
     * Cập nhật toàn bộ thông tin người dùng.
     * @returns UserDto Cập nhật thành công
     * @throws ApiError
     */
    public static usersControllerPut({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: PutUserDto,
    }): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Dữ liệu không hợp lệ - một số thông tin bị thiếu hoặc không đúng định dạng`,
                401: `Bạn chưa đặt bearer token (JWT) hợp lệ.`,
                403: `Bạn không có quyền cập nhật người dùng này (khi id trong JWT token không khớp với id trong param)`,
                404: `Không tìm thấy người dùng`,
                500: `Bug! Hãy báo cáo lỗi này cho quản trị viên trang web.`,
            },
        });
    }
    /**
     * Cập nhật một phần thông tin người dùng.
     * @returns UserDto Cập nhật thành công
     * @throws ApiError
     */
    public static usersControllerPatch({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: PatchUserDTO,
    }): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Dữ liệu không hợp lệ - một số thông tin bị thiếu hoặc không đúng định dạng`,
                401: `Bạn chưa đặt bearer token (JWT) hợp lệ.`,
                403: `Bạn không có quyền cập nhật người dùng này (khi id trong JWT token không khớp với id trong param)`,
                404: `Không tìm thấy người dùng`,
                500: `Bug! Hãy báo cáo lỗi này cho quản trị viên trang web.`,
            },
        });
    }
    /**
     * Xóa user theo id.
     * @returns any Xóa thành công
     * @throws ApiError
     */
    public static usersControllerDeleteUser({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Dữ liệu không hợp lệ - một số thông tin bị thiếu hoặc không đúng định dạng`,
                401: `Bạn chưa đặt bearer token (JWT) hợp lệ.`,
                404: `Không tìm thấy người dùng`,
                500: `Bug! Hãy báo cáo lỗi này cho quản trị viên trang web.`,
            },
        });
    }
}
