import { jest } from '@jest/globals';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Define the shape for Axios-like mock
type MockAxios = {
    request: jest.Mock;
    get: jest.Mock;
    post: jest.Mock;
    create: jest.Mock;
    defaults: Record<string, any>;
};

// Declare mock first to avoid circular reference in create()
const mock: Partial<MockAxios> = {};

mock.request = jest.fn();
mock.get = jest.fn();
mock.post = jest.fn();
mock.defaults = {};
mock.create = jest.fn(() => mock as MockAxios);

export default mock as MockAxios;
