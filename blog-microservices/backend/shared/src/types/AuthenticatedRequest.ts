import {Request} from 'express';
import {AuthPayload} from '../types/types'

export interface AuthenticatedRequest extends Request {
    user: AuthPayload
}