export class Aanvraag {
  public aanvraagId?: string;
  public docentId?: string;
  public aanvragerId: string;
  public ruimteId: string;
  public qrCode?: string;
  public startTijd: string;
  public eindTijd: string;
  public motivatie: string;
  public status: {
      aanvraagStatus: AanvraagStatus,
      toelichting?: string
  };
  }
