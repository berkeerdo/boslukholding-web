export function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export function currencyFormat(amount: number) {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + " ₺";
}

export function formatDate(dateString: string) {
  // Gün, ay ve yıl değerlerini almak için tarihi parçalayın
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Ocak ayı 0 olarak sayılır
  const year = date.getFullYear();

  // Günün adını almak için bir dizi tanımlayın
  const days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];
  const dayName = days[date.getDay()];

  // Ayın adını almak için bir dizi tanımlayın
  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  const monthName = months[month - 1];

  // Biçimlendirilmiş tarihi döndürün
  return `${day} ${monthName} ${year}, ${dayName}`;
}
