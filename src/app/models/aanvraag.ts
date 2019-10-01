interface Aanvraag {
    aanvraagId?: string;
    docentId?: string;
    aanvragerId: string;
    ruimteId: string;
    qrCode?: string;
    startTijd: string;
    eindTijd: string;
    motivatie: string;
    status: {
        aanvraagStatus: AanvraagStatus,
        toelichting?: string
    };
}
// 