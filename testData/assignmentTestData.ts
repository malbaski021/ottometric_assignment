/**
 * Test data for Assignment tests
 * Centralized data objects to avoid hardcoding values in test files
 */

export interface ColumnVerification {
    column: string;
    options: string[];
}

export interface KPIOption {
    category: string;
    option: string;
}

export interface KPIFeatureOption {
    category: string;
    option: string;
}

export interface AssignmentTest1Data {
    program: string;
    kpiOption: KPIOption;
    columnsToVerify: ColumnVerification[];
}

export interface AssignmentTest2Data {
    program: string;
    amount: number;
    eventName: string;
    kpiFeature: KPIFeatureOption;
    sortColumn: string;
    sortOption: string;
}

export const assignmentTestData = {
    test1: {
        program: 'Camera System VT1',
        kpiOption: {
            category: 'FCM',
            option: 'Lanes'
        },
        columnsToVerify: [
            {
                column: 'Lane Present',
                options: ['EGO Left', 'EGO Right']
            },
            {
                column: 'Lateral Position 30m',
                options: ['EGO Left', 'EGO Right']
            },
            {
                column: 'Lateral Position 60m',
                options: ['EGO Left', 'EGO Right']
            },
            {
                column: 'Lateral Position Conical',
                options: ['EGO Left', 'EGO Right']
            },
            {
                column: 'Type Classification Rate',
                options: ['EGO Left', 'EGO Right']
            },
            {
                column: 'Color Host Lane Boundaries White',
                options: ['EGO Left', 'EGO Right']
            },
            {
                column: 'Color Host Lane Boundaries Yellow',
                options: ['EGO Left', 'EGO Right']
            }
        ]
    } as AssignmentTest1Data,

    test2: {
        program: 'Camera System VI1',
        amount: 7,
        eventName: 'FN',
        kpiFeature: {
            category: 'ISA',
            option: 'Zone1'
        },
        sortColumn: 'Zone1',
        sortOption: 'FALSE'
    } as AssignmentTest2Data
};
