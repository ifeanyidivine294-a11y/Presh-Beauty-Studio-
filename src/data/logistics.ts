// Nigerian States and standard waybill logistics fees (from Asaba, Delta State hub)
export interface StateWaybillConfig {
  state: string;
  defaultFee: number;
  deliveryDays: string;
}

export const INITIAL_NIGERIAN_STATES: StateWaybillConfig[] = [
  { state: 'Delta (Asaba Studio Hub)', defaultFee: 1500, deliveryDays: 'Same day / 24 hours' },
  { state: 'Delta (Warri / Sapele / Ughelli)', defaultFee: 2500, deliveryDays: '24 - 48 hours' },
  { state: 'Anambra (Onitsha / Awka / Nnewi)', defaultFee: 2500, deliveryDays: '24 hours' },
  { state: 'Edo (Benin City / Ekpoma)', defaultFee: 3000, deliveryDays: '24 - 48 hours' },
  { state: 'Enugu (Enugu Urban / Nsukka)', defaultFee: 3500, deliveryDays: '1 - 2 days' },
  { state: 'Imo (Owerri / Orlu)', defaultFee: 3500, deliveryDays: '1 - 2 days' },
  { state: 'Abia (Aba / Umuahia)', defaultFee: 3500, deliveryDays: '1 - 2 days' },
  { state: 'Rivers (Port Harcourt)', defaultFee: 4000, deliveryDays: '2 - 3 days' },
  { state: 'Lagos (Island & Mainland)', defaultFee: 4500, deliveryDays: '2 - 3 days' },
  { state: 'Abuja (FCT)', defaultFee: 5000, deliveryDays: '2 - 3 days' },
  { state: 'Akwa Ibom (Uyo / Eket)', defaultFee: 4000, deliveryDays: '2 - 3 days' },
  { state: 'Cross River (Calabar)', defaultFee: 4500, deliveryDays: '2 - 4 days' },
  { state: 'Bayelsa (Yenagoa)', defaultFee: 3500, deliveryDays: '1 - 2 days' },
  { state: 'Ogun (Abeokuta / Ota)', defaultFee: 4500, deliveryDays: '2 - 3 days' },
  { state: 'Oyo (Ibadan)', defaultFee: 4500, deliveryDays: '2 - 3 days' },
  { state: 'Osun (Osogbo)', defaultFee: 4500, deliveryDays: '2 - 3 days' },
  { state: 'Ondo (Akure)', defaultFee: 4000, deliveryDays: '2 - 3 days' },
  { state: 'Ekiti (Ado-Ekiti)', defaultFee: 4500, deliveryDays: '2 - 4 days' },
  { state: 'Kogi (Lokoja)', defaultFee: 4000, deliveryDays: '2 - 3 days' },
  { state: 'Benue (Makurdi)', defaultFee: 4500, deliveryDays: '2 - 4 days' },
  { state: 'Kwara (Ilorin)', defaultFee: 4500, deliveryDays: '2 - 4 days' },
  { state: 'Plateau (Jos)', defaultFee: 5500, deliveryDays: '3 - 5 days' },
  { state: 'Kaduna', defaultFee: 5500, deliveryDays: '3 - 5 days' },
  { state: 'Kano', defaultFee: 6000, deliveryDays: '3 - 5 days' },
  { state: 'Nasarawa (Lafia)', defaultFee: 5000, deliveryDays: '3 - 4 days' },
  { state: 'Niger (Minna)', defaultFee: 5500, deliveryDays: '3 - 5 days' },
  { state: 'Adamawa (Yola)', defaultFee: 6500, deliveryDays: '4 - 6 days' },
  { state: 'Bauchi', defaultFee: 6000, deliveryDays: '3 - 5 days' },
  { state: 'Borno (Maiduguri)', defaultFee: 7000, deliveryDays: '4 - 6 days' },
  { state: 'Gombe', defaultFee: 6000, deliveryDays: '3 - 5 days' },
  { state: 'Jigawa (Dutse)', defaultFee: 6500, deliveryDays: '4 - 6 days' },
  { state: 'Katsina', defaultFee: 6500, deliveryDays: '4 - 6 days' },
  { state: 'Kebbi (Birnin Kebbi)', defaultFee: 6500, deliveryDays: '4 - 6 days' },
  { state: 'Sokoto', defaultFee: 6500, deliveryDays: '4 - 6 days' },
  { state: 'Taraba (Jalingo)', defaultFee: 6500, deliveryDays: '4 - 6 days' },
  { state: 'Yobe (Damaturu)', defaultFee: 6500, deliveryDays: '4 - 6 days' },
  { state: 'Zamfara (Gusau)', defaultFee: 6500, deliveryDays: '4 - 6 days' }
];

export interface BusinessConfig {
  studioName: string;
  ceoName: string;
  phone: string;
  whatsapp: string;
  email: string;
  pickupAddress: string;
  palmpayAccountName: string;
  palmpayAccountNumber: string;
  bankName: string;
  openingHoursWeekday: string;
  pickupTimeStart: string; // "06:30"
  pickupTimeEnd: string;   // "17:00"
}

export const INITIAL_BUSINESS_CONFIG: BusinessConfig = {
  studioName: 'Presh Beauty Studio',
  ceoName: 'Chukwudebe Ifeanyi',
  phone: '+234 906 971 0687',
  whatsapp: '2349069710687',
  email: 'Chukwudebeifeanyi6@gmail.com',
  pickupAddress: 'Presh Beauty Studio, Nnebisi Road, Asaba, Delta State, Nigeria',
  palmpayAccountName: 'Chukwudebe Ifeanyi',
  palmpayAccountNumber: '9069710687',
  bankName: 'PalmPay',
  openingHoursWeekday: '6:30 AM – 5:00 PM (Studio Consultations until 6:00 PM)',
  pickupTimeStart: '06:30',
  pickupTimeEnd: '17:00'
};
