/**
 * Common test data shared across multiple test suites
 * Contains URLs, navigation paths, and common UI elements
 */

export interface NavigationPaths {
    reportingIngestion: string;
    kpiDetails: string;
}

export interface Programs {
    cameraSystemVT1: string;
    cameraSystemVI1: string;
}

export interface TablePositions {
    left: string;
    center: string;
    right: string;
}

export interface TableTypes {
    thead: string;
    tbody: string;
    tfoot: string;
}

export const commonTestData = {
    navigationPaths: {
        reportingIngestion: '/reporting/ingestion-report',
        kpiDetails: '/kpi-details'
    } as NavigationPaths,

    programs: {
        cameraSystemVT1: 'Camera System VT1',
        cameraSystemVI1: 'Camera System VI1'
    } as Programs,

    tablePositions: {
        left: 'left',
        center: 'center',
        right: 'right'
    } as TablePositions,

    tableTypes: {
        thead: 'thead',
        tbody: 'tbody',
        tfoot: 'tfoot'
    } as TableTypes,

    timeouts: {
        short: 3000,
        medium: 5000,
        long: 15000,
        step: 2000
    }
};
