/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateGroupDto } from '../models/CreateGroupDto';
import type { GroupDto } from '../models/GroupDto';
import type { GroupUserDto } from '../models/GroupUserDto';
import type { MessageDto } from '../models/MessageDto';
import type { SendMessageDto } from '../models/SendMessageDto';
import type { UserDto } from '../models/UserDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GroupsService {
    /**
     * Tìm các nhóm chat có tên chứa chuỗi truyền vào.
     * @returns GroupDto Thành công
     * @throws ApiError
     */
    public static groupsControllerFindByNameContains({
        name,
        membershipOnly,
    }: {
        name: string,
        membershipOnly: boolean,
    }): CancelablePromise<Array<GroupDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/groups',
            query: {
                'name': name,
                'membershipOnly': membershipOnly,
            },
            errors: {
                400: `Dữ liệu không hợp lệ - một số thông tin bị thiếu hoặc không đúng định dạng`,
                401: `Bạn chưa đặt bearer token (JWT) hợp lệ.`,
                500: `Bug! Hãy báo cáo lỗi này cho quản trị viên trang web.`,
            },
        });
    }
    /**
     * Tạo nhóm chat mới.
     * @returns GroupDto Thành công
     * @throws ApiError
     */
    public static groupsControllerCreate({
        requestBody,
    }: {
        requestBody: CreateGroupDto,
    }): CancelablePromise<GroupDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/groups',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Dữ liệu không hợp lệ - một số thông tin bị thiếu hoặc không đúng định dạng`,
                401: `Bạn chưa đặt bearer token (JWT) hợp lệ.`,
                500: `Bug! Hãy báo cáo lỗi này cho quản trị viên trang web.`,
            },
        });
    }
    /**
     * Lấy thông tin nhóm chat theo ID.
     * @returns GroupDto Thành công
     * @throws ApiError
     */
    public static groupsControllerFindById({
        groupId,
    }: {
        groupId: string,
    }): CancelablePromise<GroupDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/groups/{groupId}',
            path: {
                'groupId': groupId,
            },
            errors: {
                400: `Dữ liệu không hợp lệ - một số thông tin bị thiếu hoặc không đúng định dạng`,
                401: `Bạn chưa đặt bearer token (JWT) hợp lệ.`,
                404: `Không tìm thấy nhóm`,
                500: `Bug! Hãy báo cáo lỗi này cho quản trị viên trang web.`,
            },
        });
    }
    /**
     * Tham gia nhóm chat.
     * @returns GroupUserDto Thành công
     * @throws ApiError
     */
    public static groupsControllerJoinGroup({
        groupId,
    }: {
        groupId: string,
    }): CancelablePromise<Array<GroupUserDto>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/groups/{groupId}/members/self',
            path: {
                'groupId': groupId,
            },
            errors: {
                400: `Dữ liệu không hợp lệ - một số thông tin bị thiếu hoặc không đúng định dạng`,
                401: `Bạn chưa đặt bearer token (JWT) hợp lệ.`,
                500: `Bug! Hãy báo cáo lỗi này cho quản trị viên trang web.`,
            },
        });
    }
    /**
     * Rời khỏi nhóm chat.
     * @returns any Thành công
     * @throws ApiError
     */
    public static groupsControllerLeaveGroup({
        groupId,
    }: {
        groupId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/groups/{groupId}/members/self',
            path: {
                'groupId': groupId,
            },
            errors: {
                400: `Dữ liệu không hợp lệ - một số thông tin bị thiếu hoặc không đúng định dạng`,
                401: `Bạn chưa đặt bearer token (JWT) hợp lệ.`,
                500: `Bug! Hãy báo cáo lỗi này cho quản trị viên trang web.`,
            },
        });
    }
    /**
     * Lấy danh sách người dùng trong nhóm chat.
     * @returns UserDto Thành công
     * @throws ApiError
     */
    public static groupsControllerGetUsersInGroup({
        groupId,
    }: {
        groupId: string,
    }): CancelablePromise<Array<UserDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/groups/{groupId}/users',
            path: {
                'groupId': groupId,
            },
            errors: {
                400: `Dữ liệu không hợp lệ - một số thông tin bị thiếu hoặc không đúng định dạng`,
                401: `Bạn chưa đặt bearer token (JWT) hợp lệ.`,
                500: `Bug! Hãy báo cáo lỗi này cho quản trị viên trang web.`,
            },
        });
    }
    /**
     * Lấy danh sách tin nhắn trong nhóm chat. HTTP long-polling in effect!
     * @returns MessageDto Thành công
     * @throws ApiError
     */
    public static groupsControllerGetMessagesInGroup({
        groupId,
        createdAtAfter,
    }: {
        groupId: string,
        createdAtAfter: string,
    }): CancelablePromise<Array<MessageDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/groups/{groupId}/messages',
            path: {
                'groupId': groupId,
            },
            query: {
                'createdAtAfter': createdAtAfter,
            },
            errors: {
                400: `Dữ liệu không hợp lệ - một số thông tin bị thiếu hoặc không đúng định dạng`,
                401: `Bạn chưa đặt bearer token (JWT) hợp lệ.`,
                500: `Bug! Hãy báo cáo lỗi này cho quản trị viên trang web.`,
            },
        });
    }
    /**
     * Gửi tin nhắn trong nhóm chat.
     * @returns MessageDto Thành công
     * @throws ApiError
     */
    public static groupsControllerSendMessage({
        groupId,
        requestBody,
    }: {
        groupId: string,
        requestBody: SendMessageDto,
    }): CancelablePromise<MessageDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/groups/{groupId}/messages',
            path: {
                'groupId': groupId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Dữ liệu không hợp lệ - một số thông tin bị thiếu hoặc không đúng định dạng`,
                401: `Bạn chưa đặt bearer token (JWT) hợp lệ.`,
                500: `Bug! Hãy báo cáo lỗi này cho quản trị viên trang web.`,
            },
        });
    }
}
