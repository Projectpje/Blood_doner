import { GENDER, BLOOD_GROUP, RHESUS_FACTOR } from "../Enums"
import * as Images from '../Images';

export const BloodGroups = [
    {
        title: BLOOD_GROUP.APlus,
    },
    {
        title: BLOOD_GROUP.AMinus,
    },
    {
        title: BLOOD_GROUP.BPlus,
    },
    {
        title: BLOOD_GROUP.ABPlus,
    },
    {
        title: BLOOD_GROUP.ABMinus,
    },
    {
        title: BLOOD_GROUP.OPlus,
    },
    {
        title: BLOOD_GROUP.OMinus,
    },
]

export const GenderData = [
    {
        title: GENDER.MALE,
        logo: Images.Gender.Male
    },

    {
        title: GENDER.FEMALE,
        logo: Images.Gender.Female
    },

    {
        title: GENDER.OTHER,
        logo: Images.Gender.Other
    }
]


export const RhesusFactor = [
    {
        title: RHESUS_FACTOR.POSITIVE
    },

    {
        title: RHESUS_FACTOR.NEGATIVE
    }
]

export const BinaryDropDown = [
    {
        label: "Yes",
        value: "Yes"
    },
    {
        label: "No",
        value: "No"
    }
]