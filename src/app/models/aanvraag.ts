interface Aanvraag {
  aanvraagId?: string;
  docentId?: string;
  aanvragerId: string;
  ruimteId: string;
  startTijd: string;
  eindTijd: string;
  motivatie: string;
  status: {
    aanvraagStatus: 'REQUESTED' | 'ACCEPTED' | 'REJECTED';
    toelichting?: string;
  };
}
