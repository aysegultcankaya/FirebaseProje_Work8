import { enGB } from "rsuite/esm/locales";
import tr from 'date-fns/locale/tr';

const Calendar = {
  sunday: 'Pz',
  monday: 'Pt',
  tuesday: 'Sa',
  wednesday: 'Ça',
  thursday: 'Pe',
  friday: 'Cu',
  saturday: 'Cm',
  ok: 'Tamam',
  today: 'Bugün',
  yesterday: 'Dün',
  hours: 'Saat',
  minutes: 'Dakika',
  seconds: 'Saniye',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern: 'MM yyyy',
  formattedDayPattern: 'dd MM yyyy',
  dateLocale: tr
};

export const locale = {
  common: {
    loading: 'Yükleniyor...',
    emptyMessage: 'Veri bulunamadı'
  },
  Plaintext: {
    unfilled: 'Boş',
    notSelected: 'Seçim yok',
    notUploaded: 'Karşıya Yüklenemedi'
  },
  Pagination: {
    more: 'Daha Fazla',
    prev: 'Önceki',
    next: 'Sonraki',
    first: 'İlk',
    last: 'Son',
    limit: '{0} / sayfa',
    total: 'Toplam Satır Sayısı : {0}',
    skip: 'Git{0}'
  },
  Calendar,
  DatePicker: {
    ...Calendar
  },
  DateRangePicker: {
    ...Calendar,
    last7Days: 'Son 7 Gün'
  },
  Picker: {
    noResultsText: 'Sonuç bulunamadı',
    placeholder: 'Seçiniz',
    searchPlaceholder: 'Ara',
    checkAll: 'Hepsi'
  },
  InputPicker: {
    newItem: 'Yeni',
    createOption: 'Yeni opsiyon "{0}"'
  },
  Uploader: {
    inited: 'Başlangıç',
    progress: 'Karşıya Yükleniyor',
    error: 'Hata',
    complete: 'Bitti',
    emptyFile: 'Boş',
    upload: 'Yükle'
  },
  CloseButton: {
    closeLabel: 'Kapat'
  },
  Breadcrumb: {
    expandText: 'Yolu Göster'
  },
  Toggle: {
    on: 'Aç',
    off: 'Kapat'
  }
};