import {
    SPEC_OBJ, DOCTOR_OBJ, SUBJECT, EXAM_ID, PRICE
} from '../constants/examConstants';

export function doctor(doctor) {
    return {
        type: DOCTOR_OBJ,
        doctor,
    };
}

export function subject(subject) {
    return {
        type: SUBJECT,
        subject
    };
}

export function spec(spec) {
    return {
        type: SPEC_OBJ,
        spec
    };
}

export function examID(exam) {
    return {
        type: EXAM_ID,
        exam
    };
}

export function price(price) {
    return {
        type: PRICE,
        price
    };
}