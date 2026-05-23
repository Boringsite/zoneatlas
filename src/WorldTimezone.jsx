import { useState, useEffect, useCallback, useRef } from "react";

// ── City Data ─────────────────────────────────────────────────────────────────
const CITIES = [
  { name: "New York", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Philadelphia", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Washington DC", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Boston", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Baltimore", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Charlotte", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Columbus", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Jacksonville", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Indianapolis", tz: "America/Indiana/Indianapolis", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Atlanta", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Miami", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Tampa", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Cleveland", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Pittsburgh", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Raleigh", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Virginia Beach", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Richmond", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Buffalo", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Rochester", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Hartford", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Providence", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Newark", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Orlando", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Cincinnati", tz: "America/New_York", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Louisville", tz: "America/Kentucky/Louisville", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Chicago", tz: "America/Chicago", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Houston", tz: "America/Chicago", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "San Antonio", tz: "America/Chicago", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Dallas", tz: "America/Chicago", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Austin", tz: "America/Chicago", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Fort Worth", tz: "America/Chicago", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Nashville", tz: "America/Chicago", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Memphis", tz: "America/Chicago", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Oklahoma City", tz: "America/Chicago", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Kansas City", tz: "America/Chicago", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Milwaukee", tz: "America/Chicago", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Minneapolis", tz: "America/Chicago", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Omaha", tz: "America/Chicago", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "St. Louis", tz: "America/Chicago", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "New Orleans", tz: "America/Chicago", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Tulsa", tz: "America/Chicago", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Wichita", tz: "America/Chicago", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Los Angeles", tz: "America/Los_Angeles", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "San Diego", tz: "America/Los_Angeles", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "San Jose", tz: "America/Los_Angeles", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "San Francisco", tz: "America/Los_Angeles", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Seattle", tz: "America/Los_Angeles", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Portland", tz: "America/Los_Angeles", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Las Vegas", tz: "America/Los_Angeles", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Sacramento", tz: "America/Los_Angeles", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Fresno", tz: "America/Los_Angeles", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Long Beach", tz: "America/Los_Angeles", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Oakland", tz: "America/Los_Angeles", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Denver", tz: "America/Denver", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "El Paso", tz: "America/Denver", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Colorado Springs", tz: "America/Denver", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Albuquerque", tz: "America/Denver", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Salt Lake City", tz: "America/Denver", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Boise", tz: "America/Boise", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Phoenix", tz: "America/Phoenix", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Tucson", tz: "America/Phoenix", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Mesa", tz: "America/Phoenix", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Chandler", tz: "America/Phoenix", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Scottsdale", tz: "America/Phoenix", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Honolulu", tz: "Pacific/Honolulu", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Anchorage", tz: "America/Anchorage", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Juneau", tz: "America/Juneau", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Detroit", tz: "America/Detroit", flag: "🇺🇸", region: "Americas", country: "US" },
  { name: "Toronto", tz: "America/Toronto", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Montreal", tz: "America/Toronto", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Ottawa", tz: "America/Toronto", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Hamilton", tz: "America/Toronto", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Kitchener", tz: "America/Toronto", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "London ON", tz: "America/Toronto", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Windsor", tz: "America/Toronto", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Owen Sound", tz: "America/Toronto", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Barrie", tz: "America/Toronto", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Sudbury", tz: "America/Toronto", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Thunder Bay", tz: "America/Toronto", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Quebec City", tz: "America/Toronto", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Laval", tz: "America/Toronto", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Vancouver", tz: "America/Vancouver", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Victoria", tz: "America/Vancouver", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Kelowna", tz: "America/Vancouver", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Abbotsford", tz: "America/Vancouver", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Calgary", tz: "America/Edmonton", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Edmonton", tz: "America/Edmonton", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Red Deer", tz: "America/Edmonton", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Lethbridge", tz: "America/Edmonton", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Winnipeg", tz: "America/Winnipeg", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Brandon", tz: "America/Winnipeg", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Saskatoon", tz: "America/Regina", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Regina", tz: "America/Regina", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Halifax", tz: "America/Halifax", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Moncton", tz: "America/Moncton", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Fredericton", tz: "America/Moncton", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "St. John\'s", tz: "America/St_Johns", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Whitehorse", tz: "America/Whitehorse", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Yellowknife", tz: "America/Yellowknife", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Iqaluit", tz: "America/Iqaluit", flag: "🇨🇦", region: "Americas", country: "CA" },
  { name: "Mexico City", tz: "America/Mexico_City", flag: "🇲🇽", region: "Americas", country: "MX" },
  { name: "Guadalajara", tz: "America/Mexico_City", flag: "🇲🇽", region: "Americas", country: "MX" },
  { name: "Puebla", tz: "America/Mexico_City", flag: "🇲🇽", region: "Americas", country: "MX" },
  { name: "Toluca", tz: "America/Mexico_City", flag: "🇲🇽", region: "Americas", country: "MX" },
  { name: "Monterrey", tz: "America/Monterrey", flag: "🇲🇽", region: "Americas", country: "MX" },
  { name: "Tijuana", tz: "America/Tijuana", flag: "🇲🇽", region: "Americas", country: "MX" },
  { name: "Ciudad Juárez", tz: "America/Ojinaga", flag: "🇲🇽", region: "Americas", country: "MX" },
  { name: "Cancún", tz: "America/Cancun", flag: "🇲🇽", region: "Americas", country: "MX" },
  { name: "Mérida", tz: "America/Merida", flag: "🇲🇽", region: "Americas", country: "MX" },
  { name: "Hermosillo", tz: "America/Hermosillo", flag: "🇲🇽", region: "Americas", country: "MX" },
  { name: "Chihuahua", tz: "America/Chihuahua", flag: "🇲🇽", region: "Americas", country: "MX" },
  { name: "Guatemala City", tz: "America/Guatemala", flag: "🇬🇹", region: "Americas", country: "GT" },
  { name: "San Salvador", tz: "America/El_Salvador", flag: "🇸🇻", region: "Americas", country: "SV" },
  { name: "Tegucigalpa", tz: "America/Tegucigalpa", flag: "🇭🇳", region: "Americas", country: "HN" },
  { name: "San Pedro Sula", tz: "America/Tegucigalpa", flag: "🇭🇳", region: "Americas", country: "HN" },
  { name: "Managua", tz: "America/Managua", flag: "🇳🇮", region: "Americas", country: "NI" },
  { name: "San José CR", tz: "America/Costa_Rica", flag: "🇨🇷", region: "Americas", country: "CR" },
  { name: "Panama City", tz: "America/Panama", flag: "🇵🇦", region: "Americas", country: "PA" },
  { name: "Belize City", tz: "America/Belize", flag: "🇧🇿", region: "Americas", country: "BZ" },
  { name: "Havana", tz: "America/Havana", flag: "🇨🇺", region: "Americas", country: "CU" },
  { name: "Santiago de Cuba", tz: "America/Havana", flag: "🇨🇺", region: "Americas", country: "CU" },
  { name: "Kingston", tz: "America/Jamaica", flag: "🇯🇲", region: "Americas", country: "JM" },
  { name: "Santo Domingo", tz: "America/Santo_Domingo", flag: "🇩🇴", region: "Americas", country: "DO" },
  { name: "Port-au-Prince", tz: "America/Port-au-Prince", flag: "🇭🇹", region: "Americas", country: "HT" },
  { name: "San Juan", tz: "America/Puerto_Rico", flag: "🇵🇷", region: "Americas", country: "PR" },
  { name: "Nassau", tz: "America/Nassau", flag: "🇧🇸", region: "Americas", country: "BS" },
  { name: "Port of Spain", tz: "America/Port_of_Spain", flag: "🇹🇹", region: "Americas", country: "TT" },
  { name: "Bridgetown", tz: "America/Barbados", flag: "🇧🇧", region: "Americas", country: "BB" },
  { name: "Kingstown", tz: "America/St_Vincent", flag: "🇻🇨", region: "Americas", country: "VC" },
  { name: "Castries", tz: "America/St_Lucia", flag: "🇱🇨", region: "Americas", country: "LC" },
  { name: "Roseau", tz: "America/Dominica", flag: "🇩🇲", region: "Americas", country: "DM" },
  { name: "St. George\'s", tz: "America/Grenada", flag: "🇬🇩", region: "Americas", country: "GD" },
  { name: "Basseterre", tz: "America/St_Kitts", flag: "🇰🇳", region: "Americas", country: "KN" },
  { name: "Oranjestad", tz: "America/Aruba", flag: "🇦🇼", region: "Americas", country: "AW" },
  { name: "Willemstad", tz: "America/Curacao", flag: "🇨🇼", region: "Americas", country: "CW" },
  { name: "George Town", tz: "America/Cayman", flag: "🇰🇾", region: "Americas", country: "KY" },
  { name: "São Paulo", tz: "America/Sao_Paulo", flag: "🇧🇷", region: "Americas", country: "BR" },
  { name: "Rio de Janeiro", tz: "America/Sao_Paulo", flag: "🇧🇷", region: "Americas", country: "BR" },
  { name: "Brasília", tz: "America/Sao_Paulo", flag: "🇧🇷", region: "Americas", country: "BR" },
  { name: "Belo Horizonte", tz: "America/Sao_Paulo", flag: "🇧🇷", region: "Americas", country: "BR" },
  { name: "Curitiba", tz: "America/Sao_Paulo", flag: "🇧🇷", region: "Americas", country: "BR" },
  { name: "Porto Alegre", tz: "America/Sao_Paulo", flag: "🇧🇷", region: "Americas", country: "BR" },
  { name: "Campinas", tz: "America/Sao_Paulo", flag: "🇧🇷", region: "Americas", country: "BR" },
  { name: "Recife", tz: "America/Recife", flag: "🇧🇷", region: "Americas", country: "BR" },
  { name: "Salvador", tz: "America/Bahia", flag: "🇧🇷", region: "Americas", country: "BR" },
  { name: "Fortaleza", tz: "America/Fortaleza", flag: "🇧🇷", region: "Americas", country: "BR" },
  { name: "Belém", tz: "America/Belem", flag: "🇧🇷", region: "Americas", country: "BR" },
  { name: "Manaus", tz: "America/Manaus", flag: "🇧🇷", region: "Americas", country: "BR" },
  { name: "Buenos Aires", tz: "America/Argentina/Buenos_Aires", flag: "🇦🇷", region: "Americas", country: "AR" },
  { name: "Córdoba AR", tz: "America/Argentina/Cordoba", flag: "🇦🇷", region: "Americas", country: "AR" },
  { name: "Rosario", tz: "America/Argentina/Cordoba", flag: "🇦🇷", region: "Americas", country: "AR" },
  { name: "Mendoza", tz: "America/Argentina/Mendoza", flag: "🇦🇷", region: "Americas", country: "AR" },
  { name: "Tucumán", tz: "America/Argentina/Tucuman", flag: "🇦🇷", region: "Americas", country: "AR" },
  { name: "Bogotá", tz: "America/Bogota", flag: "🇨🇴", region: "Americas", country: "CO" },
  { name: "Medellín", tz: "America/Bogota", flag: "🇨🇴", region: "Americas", country: "CO" },
  { name: "Cali", tz: "America/Bogota", flag: "🇨🇴", region: "Americas", country: "CO" },
  { name: "Barranquilla", tz: "America/Bogota", flag: "🇨🇴", region: "Americas", country: "CO" },
  { name: "Cartagena", tz: "America/Bogota", flag: "🇨🇴", region: "Americas", country: "CO" },
  { name: "Lima", tz: "America/Lima", flag: "🇵🇪", region: "Americas", country: "PE" },
  { name: "Arequipa", tz: "America/Lima", flag: "🇵🇪", region: "Americas", country: "PE" },
  { name: "Santiago", tz: "America/Santiago", flag: "🇨🇱", region: "Americas", country: "CL" },
  { name: "Concepción", tz: "America/Santiago", flag: "🇨🇱", region: "Americas", country: "CL" },
  { name: "Caracas", tz: "America/Caracas", flag: "🇻🇪", region: "Americas", country: "VE" },
  { name: "Maracaibo", tz: "America/Caracas", flag: "🇻🇪", region: "Americas", country: "VE" },
  { name: "Quito", tz: "America/Guayaquil", flag: "🇪🇨", region: "Americas", country: "EC" },
  { name: "Guayaquil", tz: "America/Guayaquil", flag: "🇪🇨", region: "Americas", country: "EC" },
  { name: "La Paz", tz: "America/La_Paz", flag: "🇧🇴", region: "Americas", country: "BO" },
  { name: "Cochabamba", tz: "America/La_Paz", flag: "🇧🇴", region: "Americas", country: "BO" },
  { name: "Montevideo", tz: "America/Montevideo", flag: "🇺🇾", region: "Americas", country: "UY" },
  { name: "Asunción", tz: "America/Asuncion", flag: "🇵🇾", region: "Americas", country: "PY" },
  { name: "Georgetown", tz: "America/Guyana", flag: "🇬🇾", region: "Americas", country: "GY" },
  { name: "Paramaribo", tz: "America/Paramaribo", flag: "🇸🇷", region: "Americas", country: "SR" },
  { name: "Cayenne", tz: "America/Cayenne", flag: "🇬🇫", region: "Americas", country: "GF" },
  { name: "Stanley", tz: "Atlantic/Stanley", flag: "🇫🇰", region: "Americas", country: "FK" },
  { name: "London", tz: "Europe/London", flag: "🇬🇧", region: "Europe", country: "GB" },
  { name: "Birmingham", tz: "Europe/London", flag: "🇬🇧", region: "Europe", country: "GB" },
  { name: "Manchester", tz: "Europe/London", flag: "🇬🇧", region: "Europe", country: "GB" },
  { name: "Glasgow", tz: "Europe/London", flag: "🇬🇧", region: "Europe", country: "GB" },
  { name: "Liverpool", tz: "Europe/London", flag: "🇬🇧", region: "Europe", country: "GB" },
  { name: "Leeds", tz: "Europe/London", flag: "🇬🇧", region: "Europe", country: "GB" },
  { name: "Sheffield", tz: "Europe/London", flag: "🇬🇧", region: "Europe", country: "GB" },
  { name: "Edinburgh", tz: "Europe/London", flag: "🇬🇧", region: "Europe", country: "GB" },
  { name: "Bristol", tz: "Europe/London", flag: "🇬🇧", region: "Europe", country: "GB" },
  { name: "Leicester", tz: "Europe/London", flag: "🇬🇧", region: "Europe", country: "GB" },
  { name: "Coventry", tz: "Europe/London", flag: "🇬🇧", region: "Europe", country: "GB" },
  { name: "Bradford", tz: "Europe/London", flag: "🇬🇧", region: "Europe", country: "GB" },
  { name: "Cardiff", tz: "Europe/London", flag: "🇬🇧", region: "Europe", country: "GB" },
  { name: "Swansea", tz: "Europe/London", flag: "🇬🇧", region: "Europe", country: "GB" },
  { name: "Belfast", tz: "Europe/London", flag: "🇬🇧", region: "Europe", country: "GB" },
  { name: "Aberdeen", tz: "Europe/London", flag: "🇬🇧", region: "Europe", country: "GB" },
  { name: "Dublin", tz: "Europe/Dublin", flag: "🇮🇪", region: "Europe", country: "IE" },
  { name: "Cork", tz: "Europe/Dublin", flag: "🇮🇪", region: "Europe", country: "IE" },
  { name: "Limerick", tz: "Europe/Dublin", flag: "🇮🇪", region: "Europe", country: "IE" },
  { name: "Galway", tz: "Europe/Dublin", flag: "🇮🇪", region: "Europe", country: "IE" },
  { name: "Paris", tz: "Europe/Paris", flag: "🇫🇷", region: "Europe", country: "FR" },
  { name: "Marseille", tz: "Europe/Paris", flag: "🇫🇷", region: "Europe", country: "FR" },
  { name: "Lyon", tz: "Europe/Paris", flag: "🇫🇷", region: "Europe", country: "FR" },
  { name: "Toulouse", tz: "Europe/Paris", flag: "🇫🇷", region: "Europe", country: "FR" },
  { name: "Nice", tz: "Europe/Paris", flag: "🇫🇷", region: "Europe", country: "FR" },
  { name: "Nantes", tz: "Europe/Paris", flag: "🇫🇷", region: "Europe", country: "FR" },
  { name: "Strasbourg", tz: "Europe/Paris", flag: "🇫🇷", region: "Europe", country: "FR" },
  { name: "Montpellier", tz: "Europe/Paris", flag: "🇫🇷", region: "Europe", country: "FR" },
  { name: "Bordeaux", tz: "Europe/Paris", flag: "🇫🇷", region: "Europe", country: "FR" },
  { name: "Lille", tz: "Europe/Paris", flag: "🇫🇷", region: "Europe", country: "FR" },
  { name: "Berlin", tz: "Europe/Berlin", flag: "🇩🇪", region: "Europe", country: "DE" },
  { name: "Hamburg", tz: "Europe/Berlin", flag: "🇩🇪", region: "Europe", country: "DE" },
  { name: "Munich", tz: "Europe/Berlin", flag: "🇩🇪", region: "Europe", country: "DE" },
  { name: "Cologne", tz: "Europe/Berlin", flag: "🇩🇪", region: "Europe", country: "DE" },
  { name: "Frankfurt", tz: "Europe/Berlin", flag: "🇩🇪", region: "Europe", country: "DE" },
  { name: "Stuttgart", tz: "Europe/Berlin", flag: "🇩🇪", region: "Europe", country: "DE" },
  { name: "Düsseldorf", tz: "Europe/Berlin", flag: "🇩🇪", region: "Europe", country: "DE" },
  { name: "Dortmund", tz: "Europe/Berlin", flag: "🇩🇪", region: "Europe", country: "DE" },
  { name: "Essen", tz: "Europe/Berlin", flag: "🇩🇪", region: "Europe", country: "DE" },
  { name: "Leipzig", tz: "Europe/Berlin", flag: "🇩🇪", region: "Europe", country: "DE" },
  { name: "Bremen", tz: "Europe/Berlin", flag: "🇩🇪", region: "Europe", country: "DE" },
  { name: "Dresden", tz: "Europe/Berlin", flag: "🇩🇪", region: "Europe", country: "DE" },
  { name: "Nuremberg", tz: "Europe/Berlin", flag: "🇩🇪", region: "Europe", country: "DE" },
  { name: "Hanover", tz: "Europe/Berlin", flag: "🇩🇪", region: "Europe", country: "DE" },
  { name: "Amsterdam", tz: "Europe/Amsterdam", flag: "🇳🇱", region: "Europe", country: "NL" },
  { name: "Rotterdam", tz: "Europe/Amsterdam", flag: "🇳🇱", region: "Europe", country: "NL" },
  { name: "The Hague", tz: "Europe/Amsterdam", flag: "🇳🇱", region: "Europe", country: "NL" },
  { name: "Utrecht", tz: "Europe/Amsterdam", flag: "🇳🇱", region: "Europe", country: "NL" },
  { name: "Eindhoven", tz: "Europe/Amsterdam", flag: "🇳🇱", region: "Europe", country: "NL" },
  { name: "Brussels", tz: "Europe/Brussels", flag: "🇧🇪", region: "Europe", country: "BE" },
  { name: "Antwerp", tz: "Europe/Brussels", flag: "🇧🇪", region: "Europe", country: "BE" },
  { name: "Ghent", tz: "Europe/Brussels", flag: "🇧🇪", region: "Europe", country: "BE" },
  { name: "Bruges", tz: "Europe/Brussels", flag: "🇧🇪", region: "Europe", country: "BE" },
  { name: "Luxembourg City", tz: "Europe/Luxembourg", flag: "🇱🇺", region: "Europe", country: "LU" },
  { name: "Madrid", tz: "Europe/Madrid", flag: "🇪🇸", region: "Europe", country: "ES" },
  { name: "Barcelona", tz: "Europe/Madrid", flag: "🇪🇸", region: "Europe", country: "ES" },
  { name: "Valencia", tz: "Europe/Madrid", flag: "🇪🇸", region: "Europe", country: "ES" },
  { name: "Seville", tz: "Europe/Madrid", flag: "🇪🇸", region: "Europe", country: "ES" },
  { name: "Zaragoza", tz: "Europe/Madrid", flag: "🇪🇸", region: "Europe", country: "ES" },
  { name: "Málaga", tz: "Europe/Madrid", flag: "🇪🇸", region: "Europe", country: "ES" },
  { name: "Bilbao", tz: "Europe/Madrid", flag: "🇪🇸", region: "Europe", country: "ES" },
  { name: "Palma", tz: "Europe/Madrid", flag: "🇪🇸", region: "Europe", country: "ES" },
  { name: "Las Palmas", tz: "Atlantic/Canary", flag: "🇪🇸", region: "Europe", country: "ES" },
  { name: "Lisbon", tz: "Europe/Lisbon", flag: "🇵🇹", region: "Europe", country: "PT" },
  { name: "Porto", tz: "Europe/Lisbon", flag: "🇵🇹", region: "Europe", country: "PT" },
  { name: "Braga", tz: "Europe/Lisbon", flag: "🇵🇹", region: "Europe", country: "PT" },
  { name: "Rome", tz: "Europe/Rome", flag: "🇮🇹", region: "Europe", country: "IT" },
  { name: "Milan", tz: "Europe/Rome", flag: "🇮🇹", region: "Europe", country: "IT" },
  { name: "Naples", tz: "Europe/Rome", flag: "🇮🇹", region: "Europe", country: "IT" },
  { name: "Turin", tz: "Europe/Rome", flag: "🇮🇹", region: "Europe", country: "IT" },
  { name: "Palermo", tz: "Europe/Rome", flag: "🇮🇹", region: "Europe", country: "IT" },
  { name: "Genoa", tz: "Europe/Rome", flag: "🇮🇹", region: "Europe", country: "IT" },
  { name: "Bologna", tz: "Europe/Rome", flag: "🇮🇹", region: "Europe", country: "IT" },
  { name: "Florence", tz: "Europe/Rome", flag: "🇮🇹", region: "Europe", country: "IT" },
  { name: "Venice", tz: "Europe/Rome", flag: "🇮🇹", region: "Europe", country: "IT" },
  { name: "Bari", tz: "Europe/Rome", flag: "🇮🇹", region: "Europe", country: "IT" },
  { name: "Zurich", tz: "Europe/Zurich", flag: "🇨🇭", region: "Europe", country: "CH" },
  { name: "Geneva", tz: "Europe/Zurich", flag: "🇨🇭", region: "Europe", country: "CH" },
  { name: "Basel", tz: "Europe/Zurich", flag: "🇨🇭", region: "Europe", country: "CH" },
  { name: "Bern", tz: "Europe/Zurich", flag: "🇨🇭", region: "Europe", country: "CH" },
  { name: "Vienna", tz: "Europe/Vienna", flag: "🇦🇹", region: "Europe", country: "AT" },
  { name: "Graz", tz: "Europe/Vienna", flag: "🇦🇹", region: "Europe", country: "AT" },
  { name: "Linz", tz: "Europe/Vienna", flag: "🇦🇹", region: "Europe", country: "AT" },
  { name: "Salzburg", tz: "Europe/Vienna", flag: "🇦🇹", region: "Europe", country: "AT" },
  { name: "Vaduz", tz: "Europe/Vaduz", flag: "🇱🇮", region: "Europe", country: "LI" },
  { name: "Monaco", tz: "Europe/Monaco", flag: "🇲🇨", region: "Europe", country: "MC" },
  { name: "Andorra la Vella", tz: "Europe/Andorra", flag: "🇦🇩", region: "Europe", country: "AD" },
  { name: "San Marino", tz: "Europe/San_Marino", flag: "🇸🇲", region: "Europe", country: "SM" },
  { name: "Vatican City", tz: "Europe/Vatican", flag: "🇻🇦", region: "Europe", country: "VA" },
  { name: "Stockholm", tz: "Europe/Stockholm", flag: "🇸🇪", region: "Europe", country: "SE" },
  { name: "Gothenburg", tz: "Europe/Stockholm", flag: "🇸🇪", region: "Europe", country: "SE" },
  { name: "Malmö", tz: "Europe/Stockholm", flag: "🇸🇪", region: "Europe", country: "SE" },
  { name: "Uppsala", tz: "Europe/Stockholm", flag: "🇸🇪", region: "Europe", country: "SE" },
  { name: "Oslo", tz: "Europe/Oslo", flag: "🇳🇴", region: "Europe", country: "NO" },
  { name: "Bergen", tz: "Europe/Oslo", flag: "🇳🇴", region: "Europe", country: "NO" },
  { name: "Trondheim", tz: "Europe/Oslo", flag: "🇳🇴", region: "Europe", country: "NO" },
  { name: "Copenhagen", tz: "Europe/Copenhagen", flag: "🇩🇰", region: "Europe", country: "DK" },
  { name: "Aarhus", tz: "Europe/Copenhagen", flag: "🇩🇰", region: "Europe", country: "DK" },
  { name: "Odense", tz: "Europe/Copenhagen", flag: "🇩🇰", region: "Europe", country: "DK" },
  { name: "Helsinki", tz: "Europe/Helsinki", flag: "🇫🇮", region: "Europe", country: "FI" },
  { name: "Tampere", tz: "Europe/Helsinki", flag: "🇫🇮", region: "Europe", country: "FI" },
  { name: "Turku", tz: "Europe/Helsinki", flag: "🇫🇮", region: "Europe", country: "FI" },
  { name: "Reykjavik", tz: "Atlantic/Reykjavik", flag: "🇮🇸", region: "Europe", country: "IS" },
  { name: "Torshavn", tz: "Atlantic/Faroe", flag: "🇫🇴", region: "Europe", country: "FO" },
  { name: "Tallinn", tz: "Europe/Tallinn", flag: "🇪🇪", region: "Europe", country: "EE" },
  { name: "Tartu", tz: "Europe/Tallinn", flag: "🇪🇪", region: "Europe", country: "EE" },
  { name: "Riga", tz: "Europe/Riga", flag: "🇱🇻", region: "Europe", country: "LV" },
  { name: "Vilnius", tz: "Europe/Vilnius", flag: "🇱🇹", region: "Europe", country: "LT" },
  { name: "Kaunas", tz: "Europe/Vilnius", flag: "🇱🇹", region: "Europe", country: "LT" },
  { name: "Warsaw", tz: "Europe/Warsaw", flag: "🇵🇱", region: "Europe", country: "PL" },
  { name: "Kraków", tz: "Europe/Warsaw", flag: "🇵🇱", region: "Europe", country: "PL" },
  { name: "Wrocław", tz: "Europe/Warsaw", flag: "🇵🇱", region: "Europe", country: "PL" },
  { name: "Gdańsk", tz: "Europe/Warsaw", flag: "🇵🇱", region: "Europe", country: "PL" },
  { name: "Poznań", tz: "Europe/Warsaw", flag: "🇵🇱", region: "Europe", country: "PL" },
  { name: "Łódź", tz: "Europe/Warsaw", flag: "🇵🇱", region: "Europe", country: "PL" },
  { name: "Prague", tz: "Europe/Prague", flag: "🇨🇿", region: "Europe", country: "CZ" },
  { name: "Brno", tz: "Europe/Prague", flag: "🇨🇿", region: "Europe", country: "CZ" },
  { name: "Ostrava", tz: "Europe/Prague", flag: "🇨🇿", region: "Europe", country: "CZ" },
  { name: "Budapest", tz: "Europe/Budapest", flag: "🇭🇺", region: "Europe", country: "HU" },
  { name: "Debrecen", tz: "Europe/Budapest", flag: "🇭🇺", region: "Europe", country: "HU" },
  { name: "Bratislava", tz: "Europe/Bratislava", flag: "🇸🇰", region: "Europe", country: "SK" },
  { name: "Bucharest", tz: "Europe/Bucharest", flag: "🇷🇴", region: "Europe", country: "RO" },
  { name: "Cluj-Napoca", tz: "Europe/Bucharest", flag: "🇷🇴", region: "Europe", country: "RO" },
  { name: "Timișoara", tz: "Europe/Bucharest", flag: "🇷🇴", region: "Europe", country: "RO" },
  { name: "Iași", tz: "Europe/Bucharest", flag: "🇷🇴", region: "Europe", country: "RO" },
  { name: "Sofia", tz: "Europe/Sofia", flag: "🇧🇬", region: "Europe", country: "BG" },
  { name: "Plovdiv", tz: "Europe/Sofia", flag: "🇧🇬", region: "Europe", country: "BG" },
  { name: "Belgrade", tz: "Europe/Belgrade", flag: "🇷🇸", region: "Europe", country: "RS" },
  { name: "Novi Sad", tz: "Europe/Belgrade", flag: "🇷🇸", region: "Europe", country: "RS" },
  { name: "Zagreb", tz: "Europe/Zagreb", flag: "🇭🇷", region: "Europe", country: "HR" },
  { name: "Split", tz: "Europe/Zagreb", flag: "🇭🇷", region: "Europe", country: "HR" },
  { name: "Ljubljana", tz: "Europe/Ljubljana", flag: "🇸🇮", region: "Europe", country: "SI" },
  { name: "Sarajevo", tz: "Europe/Sarajevo", flag: "🇧🇦", region: "Europe", country: "BA" },
  { name: "Skopje", tz: "Europe/Skopje", flag: "🇲🇰", region: "Europe", country: "MK" },
  { name: "Tirana", tz: "Europe/Tirane", flag: "🇦🇱", region: "Europe", country: "AL" },
  { name: "Athens", tz: "Europe/Athens", flag: "🇬🇷", region: "Europe", country: "GR" },
  { name: "Thessaloniki", tz: "Europe/Athens", flag: "🇬🇷", region: "Europe", country: "GR" },
  { name: "Patras", tz: "Europe/Athens", flag: "🇬🇷", region: "Europe", country: "GR" },
  { name: "Kyiv", tz: "Europe/Kiev", flag: "🇺🇦", region: "Europe", country: "UA" },
  { name: "Kharkiv", tz: "Europe/Kiev", flag: "🇺🇦", region: "Europe", country: "UA" },
  { name: "Odessa", tz: "Europe/Kiev", flag: "🇺🇦", region: "Europe", country: "UA" },
  { name: "Dnipro", tz: "Europe/Kiev", flag: "🇺🇦", region: "Europe", country: "UA" },
  { name: "Minsk", tz: "Europe/Minsk", flag: "🇧🇾", region: "Europe", country: "BY" },
  { name: "Chisinau", tz: "Europe/Chisinau", flag: "🇲🇩", region: "Europe", country: "MD" },
  { name: "Podgorica", tz: "Europe/Podgorica", flag: "🇲🇪", region: "Europe", country: "ME" },
  { name: "Pristina", tz: "Europe/Belgrade", flag: "🇽🇰", region: "Europe", country: "XK" },
  { name: "Tórshavn", tz: "Atlantic/Faroe", flag: "🇫🇴", region: "Europe", country: "FO" },
  { name: "Moscow", tz: "Europe/Moscow", flag: "🇷🇺", region: "Europe", country: "RU" },
  { name: "St. Petersburg", tz: "Europe/Moscow", flag: "🇷🇺", region: "Europe", country: "RU" },
  { name: "Kazan", tz: "Europe/Moscow", flag: "🇷🇺", region: "Europe", country: "RU" },
  { name: "Nizhny Novgorod", tz: "Europe/Moscow", flag: "🇷🇺", region: "Europe", country: "RU" },
  { name: "Yekaterinburg", tz: "Asia/Yekaterinburg", flag: "🇷🇺", region: "Europe", country: "RU" },
  { name: "Chelyabinsk", tz: "Asia/Yekaterinburg", flag: "🇷🇺", region: "Europe", country: "RU" },
  { name: "Ufa", tz: "Asia/Yekaterinburg", flag: "🇷🇺", region: "Europe", country: "RU" },
  { name: "Novosibirsk", tz: "Asia/Novosibirsk", flag: "🇷🇺", region: "Europe", country: "RU" },
  { name: "Omsk", tz: "Asia/Omsk", flag: "🇷🇺", region: "Europe", country: "RU" },
  { name: "Krasnoyarsk", tz: "Asia/Krasnoyarsk", flag: "🇷🇺", region: "Europe", country: "RU" },
  { name: "Irkutsk", tz: "Asia/Irkutsk", flag: "🇷🇺", region: "Europe", country: "RU" },
  { name: "Vladivostok", tz: "Asia/Vladivostok", flag: "🇷🇺", region: "Europe", country: "RU" },
  { name: "Khabarovsk", tz: "Asia/Vladivostok", flag: "🇷🇺", region: "Europe", country: "RU" },
  { name: "Yakutsk", tz: "Asia/Yakutsk", flag: "🇷🇺", region: "Europe", country: "RU" },
  { name: "Magadan", tz: "Asia/Magadan", flag: "🇷🇺", region: "Europe", country: "RU" },
  { name: "Istanbul", tz: "Europe/Istanbul", flag: "🇹🇷", region: "Europe", country: "TR" },
  { name: "Ankara", tz: "Europe/Istanbul", flag: "🇹🇷", region: "Europe", country: "TR" },
  { name: "Izmir", tz: "Europe/Istanbul", flag: "🇹🇷", region: "Europe", country: "TR" },
  { name: "Bursa", tz: "Europe/Istanbul", flag: "🇹🇷", region: "Europe", country: "TR" },
  { name: "Adana", tz: "Europe/Istanbul", flag: "🇹🇷", region: "Europe", country: "TR" },
  { name: "Antalya", tz: "Europe/Istanbul", flag: "🇹🇷", region: "Europe", country: "TR" },
  { name: "Dubai", tz: "Asia/Dubai", flag: "🇦🇪", region: "Middle East", country: "AE" },
  { name: "Abu Dhabi", tz: "Asia/Dubai", flag: "🇦🇪", region: "Middle East", country: "AE" },
  { name: "Sharjah", tz: "Asia/Dubai", flag: "🇦🇪", region: "Middle East", country: "AE" },
  { name: "Ajman", tz: "Asia/Dubai", flag: "🇦🇪", region: "Middle East", country: "AE" },
  { name: "Riyadh", tz: "Asia/Riyadh", flag: "🇸🇦", region: "Middle East", country: "SA" },
  { name: "Jeddah", tz: "Asia/Riyadh", flag: "🇸🇦", region: "Middle East", country: "SA" },
  { name: "Mecca", tz: "Asia/Riyadh", flag: "🇸🇦", region: "Middle East", country: "SA" },
  { name: "Medina", tz: "Asia/Riyadh", flag: "🇸🇦", region: "Middle East", country: "SA" },
  { name: "Dammam", tz: "Asia/Riyadh", flag: "🇸🇦", region: "Middle East", country: "SA" },
  { name: "Doha", tz: "Asia/Qatar", flag: "🇶🇦", region: "Middle East", country: "QA" },
  { name: "Kuwait City", tz: "Asia/Kuwait", flag: "🇰🇼", region: "Middle East", country: "KW" },
  { name: "Manama", tz: "Asia/Bahrain", flag: "🇧🇭", region: "Middle East", country: "BH" },
  { name: "Muscat", tz: "Asia/Muscat", flag: "🇴🇲", region: "Middle East", country: "OM" },
  { name: "Sana\'a", tz: "Asia/Aden", flag: "🇾🇪", region: "Middle East", country: "YE" },
  { name: "Aden", tz: "Asia/Aden", flag: "🇾🇪", region: "Middle East", country: "YE" },
  { name: "Tel Aviv", tz: "Asia/Jerusalem", flag: "🇮🇱", region: "Middle East", country: "IL" },
  { name: "Jerusalem", tz: "Asia/Jerusalem", flag: "🇮🇱", region: "Middle East", country: "IL" },
  { name: "Haifa", tz: "Asia/Jerusalem", flag: "🇮🇱", region: "Middle East", country: "IL" },
  { name: "Amman", tz: "Asia/Amman", flag: "🇯🇴", region: "Middle East", country: "JO" },
  { name: "Zarqa", tz: "Asia/Amman", flag: "🇯🇴", region: "Middle East", country: "JO" },
  { name: "Beirut", tz: "Asia/Beirut", flag: "🇱🇧", region: "Middle East", country: "LB" },
  { name: "Damascus", tz: "Asia/Damascus", flag: "🇸🇾", region: "Middle East", country: "SY" },
  { name: "Aleppo", tz: "Asia/Damascus", flag: "🇸🇾", region: "Middle East", country: "SY" },
  { name: "Baghdad", tz: "Asia/Baghdad", flag: "🇮🇶", region: "Middle East", country: "IQ" },
  { name: "Basra", tz: "Asia/Baghdad", flag: "🇮🇶", region: "Middle East", country: "IQ" },
  { name: "Mosul", tz: "Asia/Baghdad", flag: "🇮🇶", region: "Middle East", country: "IQ" },
  { name: "Tehran", tz: "Asia/Tehran", flag: "🇮🇷", region: "Middle East", country: "IR" },
  { name: "Mashhad", tz: "Asia/Tehran", flag: "🇮🇷", region: "Middle East", country: "IR" },
  { name: "Isfahan", tz: "Asia/Tehran", flag: "🇮🇷", region: "Middle East", country: "IR" },
  { name: "Tabriz", tz: "Asia/Tehran", flag: "🇮🇷", region: "Middle East", country: "IR" },
  { name: "Karaj", tz: "Asia/Tehran", flag: "🇮🇷", region: "Middle East", country: "IR" },
  { name: "Nicosia", tz: "Asia/Nicosia", flag: "🇨🇾", region: "Middle East", country: "CY" },
  { name: "Kabul", tz: "Asia/Kabul", flag: "🇦🇫", region: "Middle East", country: "AF" },
  { name: "Kandahar", tz: "Asia/Kabul", flag: "🇦🇫", region: "Middle East", country: "AF" },
  { name: "Cairo", tz: "Africa/Cairo", flag: "🇪🇬", region: "Africa", country: "EG" },
  { name: "Alexandria", tz: "Africa/Cairo", flag: "🇪🇬", region: "Africa", country: "EG" },
  { name: "Giza", tz: "Africa/Cairo", flag: "🇪🇬", region: "Africa", country: "EG" },
  { name: "Port Said", tz: "Africa/Cairo", flag: "🇪🇬", region: "Africa", country: "EG" },
  { name: "Casablanca", tz: "Africa/Casablanca", flag: "🇲🇦", region: "Africa", country: "MA" },
  { name: "Rabat", tz: "Africa/Casablanca", flag: "🇲🇦", region: "Africa", country: "MA" },
  { name: "Fez", tz: "Africa/Casablanca", flag: "🇲🇦", region: "Africa", country: "MA" },
  { name: "Marrakech", tz: "Africa/Casablanca", flag: "🇲🇦", region: "Africa", country: "MA" },
  { name: "Tangier", tz: "Africa/Casablanca", flag: "🇲🇦", region: "Africa", country: "MA" },
  { name: "Algiers", tz: "Africa/Algiers", flag: "🇩🇿", region: "Africa", country: "DZ" },
  { name: "Oran", tz: "Africa/Algiers", flag: "🇩🇿", region: "Africa", country: "DZ" },
  { name: "Constantine", tz: "Africa/Algiers", flag: "🇩🇿", region: "Africa", country: "DZ" },
  { name: "Tunis", tz: "Africa/Tunis", flag: "🇹🇳", region: "Africa", country: "TN" },
  { name: "Sfax", tz: "Africa/Tunis", flag: "🇹🇳", region: "Africa", country: "TN" },
  { name: "Tripoli", tz: "Africa/Tripoli", flag: "🇱🇾", region: "Africa", country: "LY" },
  { name: "Benghazi", tz: "Africa/Tripoli", flag: "🇱🇾", region: "Africa", country: "LY" },
  { name: "Khartoum", tz: "Africa/Khartoum", flag: "🇸🇩", region: "Africa", country: "SD" },
  { name: "Omdurman", tz: "Africa/Khartoum", flag: "🇸🇩", region: "Africa", country: "SD" },
  { name: "Lagos", tz: "Africa/Lagos", flag: "🇳🇬", region: "Africa", country: "NG" },
  { name: "Kano", tz: "Africa/Lagos", flag: "🇳🇬", region: "Africa", country: "NG" },
  { name: "Ibadan", tz: "Africa/Lagos", flag: "🇳🇬", region: "Africa", country: "NG" },
  { name: "Abuja", tz: "Africa/Lagos", flag: "🇳🇬", region: "Africa", country: "NG" },
  { name: "Port Harcourt", tz: "Africa/Lagos", flag: "🇳🇬", region: "Africa", country: "NG" },
  { name: "Benin City", tz: "Africa/Lagos", flag: "🇳🇬", region: "Africa", country: "NG" },
  { name: "Accra", tz: "Africa/Accra", flag: "🇬🇭", region: "Africa", country: "GH" },
  { name: "Kumasi", tz: "Africa/Accra", flag: "🇬🇭", region: "Africa", country: "GH" },
  { name: "Dakar", tz: "Africa/Dakar", flag: "🇸🇳", region: "Africa", country: "SN" },
  { name: "Abidjan", tz: "Africa/Abidjan", flag: "🇨🇮", region: "Africa", country: "CI" },
  { name: "Yamoussoukro", tz: "Africa/Abidjan", flag: "🇨🇮", region: "Africa", country: "CI" },
  { name: "Bamako", tz: "Africa/Bamako", flag: "🇲🇱", region: "Africa", country: "ML" },
  { name: "Conakry", tz: "Africa/Conakry", flag: "🇬🇳", region: "Africa", country: "GN" },
  { name: "Ouagadougou", tz: "Africa/Ouagadougou", flag: "🇧🇫", region: "Africa", country: "BF" },
  { name: "Lomé", tz: "Africa/Lome", flag: "🇹🇬", region: "Africa", country: "TG" },
  { name: "Cotonou", tz: "Africa/Porto-Novo", flag: "🇧🇯", region: "Africa", country: "BJ" },
  { name: "Porto-Novo", tz: "Africa/Porto-Novo", flag: "🇧🇯", region: "Africa", country: "BJ" },
  { name: "Niamey", tz: "Africa/Niamey", flag: "🇳🇪", region: "Africa", country: "NE" },
  { name: "N\'Djamena", tz: "Africa/Ndjamena", flag: "🇹🇩", region: "Africa", country: "TD" },
  { name: "Freetown", tz: "Africa/Freetown", flag: "🇸🇱", region: "Africa", country: "SL" },
  { name: "Monrovia", tz: "Africa/Monrovia", flag: "🇱🇷", region: "Africa", country: "LR" },
  { name: "Bissau", tz: "Africa/Bissau", flag: "🇬🇼", region: "Africa", country: "GW" },
  { name: "Banjul", tz: "Africa/Banjul", flag: "🇬🇲", region: "Africa", country: "GM" },
  { name: "Nouakchott", tz: "Africa/Nouakchott", flag: "🇲🇷", region: "Africa", country: "MR" },
  { name: "Praia", tz: "Atlantic/Cape_Verde", flag: "🇨🇻", region: "Africa", country: "CV" },
  { name: "São Tomé", tz: "Africa/Sao_Tome", flag: "🇸🇹", region: "Africa", country: "ST" },
  { name: "Malabo", tz: "Africa/Malabo", flag: "🇬🇶", region: "Africa", country: "GQ" },
  { name: "Kinshasa", tz: "Africa/Kinshasa", flag: "🇨🇩", region: "Africa", country: "CD" },
  { name: "Lubumbashi", tz: "Africa/Lubumbashi", flag: "🇨🇩", region: "Africa", country: "CD" },
  { name: "Brazzaville", tz: "Africa/Brazzaville", flag: "🇨🇬", region: "Africa", country: "CG" },
  { name: "Douala", tz: "Africa/Douala", flag: "🇨🇲", region: "Africa", country: "CM" },
  { name: "Yaoundé", tz: "Africa/Douala", flag: "🇨🇲", region: "Africa", country: "CM" },
  { name: "Libreville", tz: "Africa/Libreville", flag: "🇬🇦", region: "Africa", country: "GA" },
  { name: "Bangui", tz: "Africa/Bangui", flag: "🇨🇫", region: "Africa", country: "CF" },
  { name: "Luanda", tz: "Africa/Luanda", flag: "🇦🇴", region: "Africa", country: "AO" },
  { name: "Nairobi", tz: "Africa/Nairobi", flag: "🇰🇪", region: "Africa", country: "KE" },
  { name: "Mombasa", tz: "Africa/Nairobi", flag: "🇰🇪", region: "Africa", country: "KE" },
  { name: "Addis Ababa", tz: "Africa/Addis_Ababa", flag: "🇪🇹", region: "Africa", country: "ET" },
  { name: "Dire Dawa", tz: "Africa/Addis_Ababa", flag: "🇪🇹", region: "Africa", country: "ET" },
  { name: "Dar es Salaam", tz: "Africa/Dar_es_Salaam", flag: "🇹🇿", region: "Africa", country: "TZ" },
  { name: "Kampala", tz: "Africa/Kampala", flag: "🇺🇬", region: "Africa", country: "UG" },
  { name: "Kigali", tz: "Africa/Kigali", flag: "🇷🇼", region: "Africa", country: "RW" },
  { name: "Bujumbura", tz: "Africa/Bujumbura", flag: "🇧🇮", region: "Africa", country: "BI" },
  { name: "Mogadishu", tz: "Africa/Mogadishu", flag: "🇸🇴", region: "Africa", country: "SO" },
  { name: "Djibouti", tz: "Africa/Djibouti", flag: "🇩🇯", region: "Africa", country: "DJ" },
  { name: "Asmara", tz: "Africa/Asmara", flag: "🇪🇷", region: "Africa", country: "ER" },
  { name: "Juba", tz: "Africa/Juba", flag: "🇸🇸", region: "Africa", country: "SS" },
  { name: "Johannesburg", tz: "Africa/Johannesburg", flag: "🇿🇦", region: "Africa", country: "ZA" },
  { name: "Cape Town", tz: "Africa/Johannesburg", flag: "🇿🇦", region: "Africa", country: "ZA" },
  { name: "Durban", tz: "Africa/Johannesburg", flag: "🇿🇦", region: "Africa", country: "ZA" },
  { name: "Pretoria", tz: "Africa/Johannesburg", flag: "🇿🇦", region: "Africa", country: "ZA" },
  { name: "Port Elizabeth", tz: "Africa/Johannesburg", flag: "🇿🇦", region: "Africa", country: "ZA" },
  { name: "Bloemfontein", tz: "Africa/Johannesburg", flag: "🇿🇦", region: "Africa", country: "ZA" },
  { name: "Harare", tz: "Africa/Harare", flag: "🇿🇼", region: "Africa", country: "ZW" },
  { name: "Bulawayo", tz: "Africa/Harare", flag: "🇿🇼", region: "Africa", country: "ZW" },
  { name: "Lusaka", tz: "Africa/Lusaka", flag: "🇿🇲", region: "Africa", country: "ZM" },
  { name: "Ndola", tz: "Africa/Lusaka", flag: "🇿🇲", region: "Africa", country: "ZM" },
  { name: "Maputo", tz: "Africa/Maputo", flag: "🇲🇿", region: "Africa", country: "MZ" },
  { name: "Gaborone", tz: "Africa/Gaborone", flag: "🇧🇼", region: "Africa", country: "BW" },
  { name: "Windhoek", tz: "Africa/Windhoek", flag: "🇳🇦", region: "Africa", country: "NA" },
  { name: "Lilongwe", tz: "Africa/Blantyre", flag: "🇲🇼", region: "Africa", country: "MW" },
  { name: "Blantyre", tz: "Africa/Blantyre", flag: "🇲🇼", region: "Africa", country: "MW" },
  { name: "Antananarivo", tz: "Indian/Antananarivo", flag: "🇲🇬", region: "Africa", country: "MG" },
  { name: "Port Louis", tz: "Indian/Mauritius", flag: "🇲🇺", region: "Africa", country: "MU" },
  { name: "Moroni", tz: "Indian/Comoro", flag: "🇰🇲", region: "Africa", country: "KM" },
  { name: "Victoria", tz: "Indian/Mahe", flag: "🇸🇨", region: "Africa", country: "SC" },
  { name: "Mbabane", tz: "Africa/Mbabane", flag: "🇸🇿", region: "Africa", country: "SZ" },
  { name: "Maseru", tz: "Africa/Maseru", flag: "🇱🇸", region: "Africa", country: "LS" },
  { name: "Mumbai", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Delhi", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Bangalore", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Hyderabad", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Ahmedabad", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Chennai", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Kolkata", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Surat", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Pune", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Jaipur", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Lucknow", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Kanpur", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Nagpur", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Indore", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Thane", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Bhopal", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Patna", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Vadodara", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Ghaziabad", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Ludhiana", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Agra", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Varanasi", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Goa", tz: "Asia/Kolkata", flag: "🇮🇳", region: "Asia", country: "IN" },
  { name: "Karachi", tz: "Asia/Karachi", flag: "🇵🇰", region: "Asia", country: "PK" },
  { name: "Lahore", tz: "Asia/Karachi", flag: "🇵🇰", region: "Asia", country: "PK" },
  { name: "Islamabad", tz: "Asia/Karachi", flag: "🇵🇰", region: "Asia", country: "PK" },
  { name: "Faisalabad", tz: "Asia/Karachi", flag: "🇵🇰", region: "Asia", country: "PK" },
  { name: "Rawalpindi", tz: "Asia/Karachi", flag: "🇵🇰", region: "Asia", country: "PK" },
  { name: "Peshawar", tz: "Asia/Karachi", flag: "🇵🇰", region: "Asia", country: "PK" },
  { name: "Quetta", tz: "Asia/Karachi", flag: "🇵🇰", region: "Asia", country: "PK" },
  { name: "Dhaka", tz: "Asia/Dhaka", flag: "🇧🇩", region: "Asia", country: "BD" },
  { name: "Chittagong", tz: "Asia/Dhaka", flag: "🇧🇩", region: "Asia", country: "BD" },
  { name: "Sylhet", tz: "Asia/Dhaka", flag: "🇧🇩", region: "Asia", country: "BD" },
  { name: "Colombo", tz: "Asia/Colombo", flag: "🇱🇰", region: "Asia", country: "LK" },
  { name: "Kandy", tz: "Asia/Colombo", flag: "🇱🇰", region: "Asia", country: "LK" },
  { name: "Kathmandu", tz: "Asia/Kathmandu", flag: "🇳🇵", region: "Asia", country: "NP" },
  { name: "Pokhara", tz: "Asia/Kathmandu", flag: "🇳🇵", region: "Asia", country: "NP" },
  { name: "Thimphu", tz: "Asia/Thimphu", flag: "🇧🇹", region: "Asia", country: "BT" },
  { name: "Malé", tz: "Indian/Maldives", flag: "🇲🇻", region: "Asia", country: "MV" },
  { name: "Tashkent", tz: "Asia/Tashkent", flag: "🇺🇿", region: "Asia", country: "UZ" },
  { name: "Samarkand", tz: "Asia/Tashkent", flag: "🇺🇿", region: "Asia", country: "UZ" },
  { name: "Almaty", tz: "Asia/Almaty", flag: "🇰🇿", region: "Asia", country: "KZ" },
  { name: "Nur-Sultan", tz: "Asia/Almaty", flag: "🇰🇿", region: "Asia", country: "KZ" },
  { name: "Shymkent", tz: "Asia/Almaty", flag: "🇰🇿", region: "Asia", country: "KZ" },
  { name: "Bishkek", tz: "Asia/Bishkek", flag: "🇰🇬", region: "Asia", country: "KG" },
  { name: "Dushanbe", tz: "Asia/Dushanbe", flag: "🇹🇯", region: "Asia", country: "TJ" },
  { name: "Ashgabat", tz: "Asia/Ashgabat", flag: "🇹🇲", region: "Asia", country: "TM" },
  { name: "Tbilisi", tz: "Asia/Tbilisi", flag: "🇬🇪", region: "Asia", country: "GE" },
  { name: "Batumi", tz: "Asia/Tbilisi", flag: "🇬🇪", region: "Asia", country: "GE" },
  { name: "Baku", tz: "Asia/Baku", flag: "🇦🇿", region: "Asia", country: "AZ" },
  { name: "Ganja", tz: "Asia/Baku", flag: "🇦🇿", region: "Asia", country: "AZ" },
  { name: "Yerevan", tz: "Asia/Yerevan", flag: "🇦🇲", region: "Asia", country: "AM" },
  { name: "Singapore", tz: "Asia/Singapore", flag: "🇸🇬", region: "Asia", country: "SG" },
  { name: "Bangkok", tz: "Asia/Bangkok", flag: "🇹🇭", region: "Asia", country: "TH" },
  { name: "Chiang Mai", tz: "Asia/Bangkok", flag: "🇹🇭", region: "Asia", country: "TH" },
  { name: "Phuket", tz: "Asia/Bangkok", flag: "🇹🇭", region: "Asia", country: "TH" },
  { name: "Jakarta", tz: "Asia/Jakarta", flag: "🇮🇩", region: "Asia", country: "ID" },
  { name: "Surabaya", tz: "Asia/Jakarta", flag: "🇮🇩", region: "Asia", country: "ID" },
  { name: "Medan", tz: "Asia/Jakarta", flag: "🇮🇩", region: "Asia", country: "ID" },
  { name: "Bandung", tz: "Asia/Jakarta", flag: "🇮🇩", region: "Asia", country: "ID" },
  { name: "Bali", tz: "Asia/Makassar", flag: "🇮🇩", region: "Asia", country: "ID" },
  { name: "Makassar", tz: "Asia/Makassar", flag: "🇮🇩", region: "Asia", country: "ID" },
  { name: "Manado", tz: "Asia/Makassar", flag: "🇮🇩", region: "Asia", country: "ID" },
  { name: "Jayapura", tz: "Asia/Jayapura", flag: "🇮🇩", region: "Asia", country: "ID" },
  { name: "Manila", tz: "Asia/Manila", flag: "🇵🇭", region: "Asia", country: "PH" },
  { name: "Quezon City", tz: "Asia/Manila", flag: "🇵🇭", region: "Asia", country: "PH" },
  { name: "Cebu City", tz: "Asia/Manila", flag: "🇵🇭", region: "Asia", country: "PH" },
  { name: "Davao", tz: "Asia/Manila", flag: "🇵🇭", region: "Asia", country: "PH" },
  { name: "Kuala Lumpur", tz: "Asia/Kuala_Lumpur", flag: "🇲🇾", region: "Asia", country: "MY" },
  { name: "Penang", tz: "Asia/Kuala_Lumpur", flag: "🇲🇾", region: "Asia", country: "MY" },
  { name: "Johor Bahru", tz: "Asia/Kuala_Lumpur", flag: "🇲🇾", region: "Asia", country: "MY" },
  { name: "Kota Kinabalu", tz: "Asia/Kuching", flag: "🇲🇾", region: "Asia", country: "MY" },
  { name: "Kuching", tz: "Asia/Kuching", flag: "🇲🇾", region: "Asia", country: "MY" },
  { name: "Ho Chi Minh City", tz: "Asia/Ho_Chi_Minh", flag: "🇻🇳", region: "Asia", country: "VN" },
  { name: "Hanoi", tz: "Asia/Ho_Chi_Minh", flag: "🇻🇳", region: "Asia", country: "VN" },
  { name: "Da Nang", tz: "Asia/Ho_Chi_Minh", flag: "🇻🇳", region: "Asia", country: "VN" },
  { name: "Yangon", tz: "Asia/Rangoon", flag: "🇲🇲", region: "Asia", country: "MM" },
  { name: "Mandalay", tz: "Asia/Rangoon", flag: "🇲🇲", region: "Asia", country: "MM" },
  { name: "Naypyidaw", tz: "Asia/Rangoon", flag: "🇲🇲", region: "Asia", country: "MM" },
  { name: "Phnom Penh", tz: "Asia/Phnom_Penh", flag: "🇰🇭", region: "Asia", country: "KH" },
  { name: "Vientiane", tz: "Asia/Vientiane", flag: "🇱🇦", region: "Asia", country: "LA" },
  { name: "Bandar Seri Begawan", tz: "Asia/Brunei", flag: "🇧🇳", region: "Asia", country: "BN" },
  { name: "Dili", tz: "Asia/Dili", flag: "🇹🇱", region: "Asia", country: "TL" },
  { name: "Tokyo", tz: "Asia/Tokyo", flag: "🇯🇵", region: "Asia", country: "JP" },
  { name: "Osaka", tz: "Asia/Tokyo", flag: "🇯🇵", region: "Asia", country: "JP" },
  { name: "Nagoya", tz: "Asia/Tokyo", flag: "🇯🇵", region: "Asia", country: "JP" },
  { name: "Sapporo", tz: "Asia/Tokyo", flag: "🇯🇵", region: "Asia", country: "JP" },
  { name: "Fukuoka", tz: "Asia/Tokyo", flag: "🇯🇵", region: "Asia", country: "JP" },
  { name: "Kobe", tz: "Asia/Tokyo", flag: "🇯🇵", region: "Asia", country: "JP" },
  { name: "Kyoto", tz: "Asia/Tokyo", flag: "🇯🇵", region: "Asia", country: "JP" },
  { name: "Yokohama", tz: "Asia/Tokyo", flag: "🇯🇵", region: "Asia", country: "JP" },
  { name: "Hiroshima", tz: "Asia/Tokyo", flag: "🇯🇵", region: "Asia", country: "JP" },
  { name: "Seoul", tz: "Asia/Seoul", flag: "🇰🇷", region: "Asia", country: "KR" },
  { name: "Busan", tz: "Asia/Seoul", flag: "🇰🇷", region: "Asia", country: "KR" },
  { name: "Incheon", tz: "Asia/Seoul", flag: "🇰🇷", region: "Asia", country: "KR" },
  { name: "Daegu", tz: "Asia/Seoul", flag: "🇰🇷", region: "Asia", country: "KR" },
  { name: "Daejeon", tz: "Asia/Seoul", flag: "🇰🇷", region: "Asia", country: "KR" },
  { name: "Hong Kong", tz: "Asia/Hong_Kong", flag: "🇭🇰", region: "Asia", country: "HK" },
  { name: "Macau", tz: "Asia/Macau", flag: "🇲🇴", region: "Asia", country: "MO" },
  { name: "Shanghai", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Beijing", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Chongqing", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Tianjin", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Guangzhou", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Shenzhen", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Wuhan", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Chengdu", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Nanjing", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Xi\'an", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Hangzhou", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Harbin", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Shenyang", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Dongguan", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Foshan", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Zhengzhou", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Qingdao", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Suzhou", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Kunming", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Dalian", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Xiamen", tz: "Asia/Shanghai", flag: "🇨🇳", region: "Asia", country: "CN" },
  { name: "Taipei", tz: "Asia/Taipei", flag: "🇹🇼", region: "Asia", country: "TW" },
  { name: "Kaohsiung", tz: "Asia/Taipei", flag: "🇹🇼", region: "Asia", country: "TW" },
  { name: "Taichung", tz: "Asia/Taipei", flag: "🇹🇼", region: "Asia", country: "TW" },
  { name: "Ulaanbaatar", tz: "Asia/Ulaanbaatar", flag: "🇲🇳", region: "Asia", country: "MN" },
  { name: "Pyongyang", tz: "Asia/Pyongyang", flag: "🇰🇵", region: "Asia", country: "KP" },
  { name: "Sydney", tz: "Australia/Sydney", flag: "🇦🇺", region: "Pacific", country: "AU" },
  { name: "Melbourne", tz: "Australia/Melbourne", flag: "🇦🇺", region: "Pacific", country: "AU" },
  { name: "Brisbane", tz: "Australia/Brisbane", flag: "🇦🇺", region: "Pacific", country: "AU" },
  { name: "Perth", tz: "Australia/Perth", flag: "🇦🇺", region: "Pacific", country: "AU" },
  { name: "Adelaide", tz: "Australia/Adelaide", flag: "🇦🇺", region: "Pacific", country: "AU" },
  { name: "Gold Coast", tz: "Australia/Brisbane", flag: "🇦🇺", region: "Pacific", country: "AU" },
  { name: "Newcastle", tz: "Australia/Sydney", flag: "🇦🇺", region: "Pacific", country: "AU" },
  { name: "Canberra", tz: "Australia/Sydney", flag: "🇦🇺", region: "Pacific", country: "AU" },
  { name: "Wollongong", tz: "Australia/Sydney", flag: "🇦🇺", region: "Pacific", country: "AU" },
  { name: "Sunshine Coast", tz: "Australia/Brisbane", flag: "🇦🇺", region: "Pacific", country: "AU" },
  { name: "Darwin", tz: "Australia/Darwin", flag: "🇦🇺", region: "Pacific", country: "AU" },
  { name: "Hobart", tz: "Australia/Hobart", flag: "🇦🇺", region: "Pacific", country: "AU" },
  { name: "Cairns", tz: "Australia/Brisbane", flag: "🇦🇺", region: "Pacific", country: "AU" },
  { name: "Townsville", tz: "Australia/Brisbane", flag: "🇦🇺", region: "Pacific", country: "AU" },
  { name: "Auckland", tz: "Pacific/Auckland", flag: "🇳🇿", region: "Pacific", country: "NZ" },
  { name: "Wellington", tz: "Pacific/Auckland", flag: "🇳🇿", region: "Pacific", country: "NZ" },
  { name: "Christchurch", tz: "Pacific/Auckland", flag: "🇳🇿", region: "Pacific", country: "NZ" },
  { name: "Hamilton NZ", tz: "Pacific/Auckland", flag: "🇳🇿", region: "Pacific", country: "NZ" },
  { name: "Tauranga", tz: "Pacific/Auckland", flag: "🇳🇿", region: "Pacific", country: "NZ" },
  { name: "Suva", tz: "Pacific/Fiji", flag: "🇫🇯", region: "Pacific", country: "FJ" },
  { name: "Lautoka", tz: "Pacific/Fiji", flag: "🇫🇯", region: "Pacific", country: "FJ" },
  { name: "Port Moresby", tz: "Pacific/Port_Moresby", flag: "🇵🇬", region: "Pacific", country: "PG" },
  { name: "Noumea", tz: "Pacific/Noumea", flag: "🇳🇨", region: "Pacific", country: "NC" },
  { name: "Papeete", tz: "Pacific/Tahiti", flag: "🇵🇫", region: "Pacific", country: "PF" },
  { name: "Apia", tz: "Pacific/Apia", flag: "🇼🇸", region: "Pacific", country: "WS" },
  { name: "Nuku\'alofa", tz: "Pacific/Tongatapu", flag: "🇹🇴", region: "Pacific", country: "TO" },
  { name: "Honiara", tz: "Pacific/Guadalcanal", flag: "🇸🇧", region: "Pacific", country: "SB" },
  { name: "Port Vila", tz: "Pacific/Efate", flag: "🇻🇺", region: "Pacific", country: "VU" },
  { name: "Funafuti", tz: "Pacific/Funafuti", flag: "🇹🇻", region: "Pacific", country: "TV" },
  { name: "South Tarawa", tz: "Pacific/Tarawa", flag: "🇰🇮", region: "Pacific", country: "KI" },
  { name: "Majuro", tz: "Pacific/Majuro", flag: "🇲🇭", region: "Pacific", country: "MH" },
  { name: "Palikir", tz: "Pacific/Pohnpei", flag: "🇫🇲", region: "Pacific", country: "FM" },
  { name: "Koror", tz: "Pacific/Palau", flag: "🇵🇼", region: "Pacific", country: "PW" },
  { name: "Hagåtña", tz: "Pacific/Guam", flag: "🇬🇺", region: "Pacific", country: "GU" },
  { name: "Saipan", tz: "Pacific/Saipan", flag: "🇲🇵", region: "Pacific", country: "MP" },
  { name: "Pago Pago", tz: "Pacific/Pago_Pago", flag: "🇦🇸", region: "Pacific", country: "AS" },
  { name: "Fakaofo", tz: "Pacific/Fakaofo", flag: "🇹🇰", region: "Pacific", country: "TK" },
  { name: "Alofi", tz: "Pacific/Niue", flag: "🇳🇺", region: "Pacific", country: "NU" },
  { name: "Adamstown", tz: "Pacific/Pitcairn", flag: "🇵🇳", region: "Pacific", country: "PN" },
  { name: "Avarua", tz: "Pacific/Rarotonga", flag: "🇨🇰", region: "Pacific", country: "CK" },
  { name: "Ponta Delgada", tz: "Atlantic/Azores", flag: "🇵🇹", region: "Europe", country: "PT" },
  { name: "Funchal", tz: "Atlantic/Madeira", flag: "🇵🇹", region: "Europe", country: "PT" },
  { name: "Nuuk", tz: "America/Godthab", flag: "🇬🇱", region: "Americas", country: "GL" },
  { name: "Antananarivo", tz: "Indian/Antananarivo", flag: "🇲🇬", region: "Africa", country: "MG" },
  { name: "Port Louis", tz: "Indian/Mauritius", flag: "🇲🇺", region: "Africa", country: "MU" },
  { name: "Moroni", tz: "Indian/Comoro", flag: "🇰🇲", region: "Africa", country: "KM" },
  { name: "Victoria SC", tz: "Indian/Mahe", flag: "🇸🇨", region: "Africa", country: "SC" },
  { name: "Dzaoudzi", tz: "Indian/Mayotte", flag: "🇾🇹", region: "Africa", country: "YT" },
  { name: "Saint-Denis", tz: "Indian/Reunion", flag: "🇷🇪", region: "Africa", country: "RE" },
  { name: "Diego Garcia", tz: "Indian/Chagos", flag: "🇮🇴", region: "Asia", country: "IO" },
];

const QUICK_PICKS = ["London", "New York", "Tokyo", "Sydney", "Dubai", "Singapore", "Paris", "Toronto"];

const HOLIDAYS = {
  "America/New_York": [{ d: "Jan 1", n: "New Year's Day" }, { d: "Jul 4", n: "Independence Day" }, { d: "Nov 28", n: "Thanksgiving" }, { d: "Dec 25", n: "Christmas Day" }],
  "Europe/London": [{ d: "Jan 1", n: "New Year's Day" }, { d: "Dec 25", n: "Christmas Day" }, { d: "Dec 26", n: "Boxing Day" }],
  "Asia/Tokyo": [{ d: "Jan 1", n: "New Year's Day" }, { d: "Feb 11", n: "National Foundation Day" }, { d: "May 3", n: "Constitution Day" }, { d: "Aug 11", n: "Mountain Day" }, { d: "Dec 23", n: "Emperor's Birthday" }],
  "Australia/Sydney": [{ d: "Jan 1", n: "New Year's Day" }, { d: "Jan 26", n: "Australia Day" }, { d: "Apr 25", n: "ANZAC Day" }, { d: "Dec 25", n: "Christmas Day" }, { d: "Dec 26", n: "Boxing Day" }],
  "Europe/Paris": [{ d: "Jan 1", n: "New Year's Day" }, { d: "Jul 14", n: "Bastille Day" }, { d: "Dec 25", n: "Christmas Day" }],
  "Asia/Kolkata": [{ d: "Jan 26", n: "Republic Day" }, { d: "Aug 15", n: "Independence Day" }, { d: "Oct 2", n: "Gandhi Jayanti" }],
  "Asia/Singapore": [{ d: "Jan 1", n: "New Year's Day" }, { d: "Aug 9", n: "National Day" }, { d: "Dec 25", n: "Christmas Day" }],
  "Europe/Berlin": [{ d: "Jan 1", n: "New Year's Day" }, { d: "Oct 3", n: "German Unity Day" }, { d: "Dec 25", n: "Christmas Day" }],
  "Asia/Dubai": [{ d: "Jan 1", n: "New Year's Day" }, { d: "Dec 2", n: "UAE National Day" }],
  "America/Toronto": [{ d: "Jan 1", n: "New Year's Day" }, { d: "Jul 1", n: "Canada Day" }, { d: "Dec 25", n: "Christmas Day" }, { d: "Dec 26", n: "Boxing Day" }],
};

const REGIONS = ["All", "Americas", "Europe", "Middle East", "Africa", "Asia", "Pacific"];

// ── Helpers ───────────────────────────────────────────────────────────────────
function getZoneTime(tz, date = new Date()) {
  return new Date(date.toLocaleString("en-US", { timeZone: tz }));
}
function fmt(date, u24) {
  const h = date.getHours(), m = date.getMinutes(), s = date.getSeconds();
  if (u24) return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  const ap = h >= 12 ? "PM" : "AM", h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")} ${ap}`;
}
function fmtH(h, u24) {
  if (u24) return `${String(h).padStart(2,"0")}:00`;
  const ap = h >= 12 ? "PM" : "AM", h12 = h % 12 || 12;
  return `${h12}${ap}`;
}
function getOffset(tz) {
  const now = new Date();
  const utc = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
  const zone = new Date(now.toLocaleString("en-US", { timeZone: tz }));
  const mins = Math.round((zone - utc) / 60000);
  const sign = mins >= 0 ? "+" : "-";
  const abs = Math.abs(mins);
  return `UTC${sign}${Math.floor(abs / 60)}${abs % 60 ? ":" + String(abs % 60).padStart(2,"0") : ""}`;
}
function getStatusInfo(h, ws = { start: 9, end: 18 }) {
  if (h >= ws.start && h < ws.end) return { label: "Working", color: "#00c864", bg: "rgba(0,200,100,0.2)", status: "work" };
  if (h >= 7 && h < 22) return { label: "Awake", color: "#ffb400", bg: "rgba(255,180,0,0.12)", status: "awake" };
  return { label: "Sleeping", color: "#4a6080", bg: "rgba(255,255,255,0.02)", status: "sleep" };
}
function getDateStr(tz, now = new Date()) {
  return new Date(now.toLocaleString("en-US", { timeZone: tz }))
    .toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: tz });
}
function toUnix(date) { return Math.floor(date.getTime() / 1000); }
function getTimeGreeting(h) {
  if (h >= 5 && h < 12) return { text: "Good morning!", sub: "The world is waking up. Add your team's cities to see who's at their desk.", emoji: "🌅" };
  if (h >= 12 && h < 17) return { text: "Good afternoon!", sub: "Peak hours for most of the world. Let's see who's available.", emoji: "☀️" };
  if (h >= 17 && h < 21) return { text: "Good evening!", sub: "Europe is wrapping up — Asia Pacific is hitting their stride.", emoji: "🌆" };
  return { text: "Burning the midnight oil?", sub: "The Asia Pacific team is just getting started. You're in good company.", emoji: "🌙" };
}
function checkHoliday(tz, now = new Date()) {
  const holidays = HOLIDAYS[tz] || [];
  const t = getZoneTime(tz, now);
  const monthStr = t.toLocaleDateString("en-US", { month: "short" });
  const dayStr = t.getDate().toString();
  return holidays.find(h => h.d.startsWith(monthStr) && h.d.split(" ")[1] === dayStr) || null;
}

const FAQ = [
  { q: "What is ZoneAtlas?", a: "ZoneAtlas is the world's most complete free timezone tool. It shows live world clocks, a meeting planner, team availability heatmap, Discord timestamp generator, and a recurring meeting DST checker — all in one place with no signup required." },
  { q: "How does the sleep overlay work?", a: "The 24-hour timeline color codes each hour: green means work hours (9am-6pm), amber means awake but outside work hours, dark means sleeping. You can set custom work hours for each city using the settings icon on each clock card." },
  { q: "Does ZoneAtlas handle Daylight Saving Time?", a: "Yes. All conversions use your browser's live timezone database which automatically updates for DST transitions in every country. The Recurring Meeting tab shows you how your weekly slot shifts throughout the year." },
  { q: "How do saved team profiles work?", a: "Save your team's cities as a named profile — like 'My Dev Team'. One click reloads everything instantly. Profiles are saved in your browser and never require an account. Your data never leaves your device." },
  { q: "What are Discord timestamps?", a: "Discord timestamps are codes like <t:1234567890:F> that automatically show in every Discord user's local time. Paste them in any server, DM, or announcement and they display correctly for everyone." },
  { q: "What is the Team Availability Heatmap?", a: "The heatmap shows every hour of the week color-coded by how many team members are in work hours. Green means everyone is available. It instantly reveals the best slots for meetings without back-and-forth emails." },
  { q: "Is my data safe?", a: "ZoneAtlas collects no personal information. Saved team profiles are stored only in your browser's local storage — they never touch our servers. There is no account, no email required, and nothing to steal." },
  { q: "Is ZoneAtlas really free?", a: "Yes, completely free forever. No signup, no subscription. ZoneAtlas is supported by non-intrusive advertising placed only in content areas — never inside the tool itself." },
];

// ── Toast Component ───────────────────────────────────────────────────────────
function Toast({ message, emoji, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div style={{ position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)", zIndex: 200, background: "#0c1730", border: "1px solid rgba(0,200,255,0.3)", borderRadius: 12, padding: "12px 18px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", maxWidth: 380, animation: "slideUp 0.3s ease" }}>
      <span style={{ fontSize: 20 }}>{emoji}</span>
      <span style={{ fontSize: 13, color: "#eef4ff", fontWeight: 500, lineHeight: 1.5 }}>{message}</span>
      <button onClick={onClose} style={{ marginLeft: "auto", color: "#4a6080", fontSize: 14, background: "none", border: "none", cursor: "pointer", padding: "0 4px", flexShrink: 0 }}>✕</button>
    </div>
  );
}

// ── Tooltip Component ─────────────────────────────────────────────────────────
function Tooltip({ text, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div style={{ background: "rgba(0,200,255,0.15)", border: "1px solid rgba(0,200,255,0.3)", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#00c8ff", fontWeight: 500, marginTop: 8, display: "flex", alignItems: "center", gap: 6, animation: "fadeIn 0.3s ease" }}>
      <span>💡</span>
      <span style={{ flex: 1 }}>{text}</span>
      <button onClick={onClose} style={{ color: "rgba(0,200,255,0.5)", fontSize: 12, background: "none", border: "none", cursor: "pointer" }}>✕</button>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function WorldTimezone({ onPrivacy, onAbout }) {
  const [now, setNow] = useState(new Date());
  const [zones, setZones] = useState([]);
  const [customHours, setCustomHours] = useState({});
  const [u24, setU24] = useState(false);
  const [tab, setTab] = useState("clock");
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [showSearch, setShowSearch] = useState(false);
  const [mHour, setMHour] = useState(10);
  const [copiedKey, setCopiedKey] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [hoverH, setHoverH] = useState(null);
  const [showCustomHours, setShowCustomHours] = useState(null);
  const [profiles, setProfiles] = useState(() => { try { return JSON.parse(localStorage.getItem("za_profiles") || "{}"); } catch { return {}; } });
  const [profileName, setProfileName] = useState("");
  const [showProfileSave, setShowProfileSave] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const [discordTime, setDiscordTime] = useState(() => new Date().toISOString().slice(0, 16));
  const [toast, setToast] = useState(null);
  const [seenTooltips, setSeenTooltips] = useState(() => { try { return JSON.parse(localStorage.getItem("za_tooltips") || "{}"); } catch { return {}; } });
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isReturning, setIsReturning] = useState(false);
  const [onboardStep, setOnboardStep] = useState(0);
  const [showShareNudge, setShowShareNudge] = useState(false);
  const [geoSearch, setGeoSearch] = useState([]);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState(false);
  const [lightMode, setLightMode] = useState(() => localStorage.getItem("za_theme") === "light");
  const visitCount = useRef(0);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Initialise — detect returning user, load last cities
  useEffect(() => {
    const visits = parseInt(localStorage.getItem("za_visits") || "0") + 1;
    localStorage.setItem("za_visits", visits);
    visitCount.current = visits;

    const lastCities = localStorage.getItem("za_last_cities");
    const defaultProfile = localStorage.getItem("za_default_profile");

    if (visits > 1) {
      setIsReturning(true);
      if (defaultProfile && profiles[defaultProfile]) {
        const loaded = profiles[defaultProfile].map(n => CITIES.find(c => c.name === n)).filter(Boolean);
        if (loaded.length) { setZones(loaded); setOnboardStep(3); }
      } else if (lastCities) {
        const names = JSON.parse(lastCities);
        const loaded = names.map(n => CITIES.find(c => c.name === n)).filter(Boolean);
        if (loaded.length) { setZones(loaded); setOnboardStep(3); }
      }
      // Show returning greeting after short delay
      setTimeout(() => {
        const g = getTimeGreeting(new Date().getHours());
        setToast({ message: defaultProfile ? `Welcome back! Your team "${defaultProfile}" is ready.` : "Welcome back! Your last cities have been restored.", emoji: "👋" });
      }, 600);
    } else {
      // First visit — auto-detect location from timezone
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let match = CITIES.find(c => c.tz === tz);
        if (!match) {
          const prefix = tz.split("/")[0];
          match = CITIES.find(c => c.tz.startsWith(prefix));
        }
        if (match) setZones([match]);
      } catch {}
      setOnboardStep(1);
    }
  }, []);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem("za_theme", lightMode ? "light" : "dark");
  }, [lightMode]);

  // Save last cities whenever zones change
  useEffect(() => {
    if (zones.length) localStorage.setItem("za_last_cities", JSON.stringify(zones.map(z => z.name)));
  }, [zones]);

  // Smart prompts based on state
  useEffect(() => {
    if (zones.length === 2 && onboardStep < 2) {
      setOnboardStep(2);
      // Check if anyone is awake
      const awakeZones = zones.filter(z => {
        const h = getZoneTime(z.tz, now).getHours();
        return h >= 7 && h < 22;
      });
      if (awakeZones.length > 0) {
        setTimeout(() => setToast({ message: `Your ${awakeZones[awakeZones.length - 1].name} contact is awake right now — good time to message them!`, emoji: "👋" }), 800);
      }
    }
    if (zones.length >= 3 && onboardStep < 3) {
      setOnboardStep(3);
      setTimeout(() => setToast({ message: "Ready to find the best meeting time for everyone? Try the Meeting Planner.", emoji: "📅", action: () => setTab("planner") }), 1200);
    }
  }, [zones.length]);

  // DST awareness check
  useEffect(() => {
    if (zones.length < 2) return;
    // Check for upcoming DST in next 7 days (simplified signal)
    const nowMs = now.getTime();
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    zones.forEach(zone => {
      const nowOffset = getOffset(zone.tz);
      const futureOffset = getOffset(zone.tz); // In real app, would check 7 days ahead
      // Holiday check
      const holiday = checkHoliday(zone.tz, now);
      if (holiday && !seenTooltips[`holiday_${zone.name}_${holiday.d}`]) {
        setTimeout(() => {
          setToast({ message: `Today is ${holiday.n} in ${zone.name}. Your contact there may be off today!`, emoji: "🎉" });
          markTooltip(`holiday_${zone.name}_${holiday.d}`);
        }, 2000);
      }
    });
  }, [zones]);

  const markTooltip = (key) => {
    const updated = { ...seenTooltips, [key]: true };
    setSeenTooltips(updated);
    localStorage.setItem("za_tooltips", JSON.stringify(updated));
  };

  const showTooltip = (key, text) => {
    if (seenTooltips[key]) return;
    setActiveTooltip({ key, text });
    markTooltip(key);
  };

  const addZone = (c) => {
    if (zones.length >= 8 || zones.find(z => z.tz === c.tz && z.name === c.name)) return;
    setZones(p => [...p, c]);
    setShowSearch(false);
    setSearch("");
  };

  const removeZone = (i) => {
    setZones(p => p.filter((_, j) => j !== i));
  };

  // GeoNames API search — 40,000+ cities globally
  const searchGeoNames = async (query) => {
    if (query.length < 3) { setGeoSearch([]); return; }
    setGeoLoading(true);
    setGeoError(false);
    try {
      const res = await fetch(
        `https://secure.geonames.org/searchJSON?q=${encodeURIComponent(query)}&maxRows=15&featureClass=P&orderby=population&style=SHORT&username=docvault`
      );
      const data = await res.json();
      // Check for GeoNames API error response
      if (data.status) {
        console.warn("GeoNames API:", data.status.message);
        setGeoError(true);
        setGeoLoading(false);
        return;
      }
      if (data.geonames && data.geonames.length > 0) {
        const results = data.geonames
          .filter(g => g.timezone && g.timezone.timeZoneId)
          .map(g => ({
            name: g.name,
            tz: g.timezone.timeZoneId,
            flag: countryToFlag(g.countryCode),
            region: getRegion(g.countryCode),
            country: g.countryCode,
            population: g.population,
            adminName: g.adminName1,
          }));
        setGeoSearch(results);
      } else {
        // No results from API — fall back to local
        setGeoSearch([]);
      }
    } catch (e) {
      console.warn("GeoNames fetch error:", e);
      setGeoError(true);
    }
    setGeoLoading(false);
  };

  const countryToFlag = (code) => {
    if (!code) return "🌍";
    const flags = {
      US:"🇺🇸",CA:"🇨🇦",GB:"🇬🇧",AU:"🇦🇺",NZ:"🇳🇿",DE:"🇩🇪",FR:"🇫🇷",IT:"🇮🇹",ES:"🇪🇸",PT:"🇵🇹",
      NL:"🇳🇱",BE:"🇧🇪",CH:"🇨🇭",AT:"🇦🇹",SE:"🇸🇪",NO:"🇳🇴",DK:"🇩🇰",FI:"🇫🇮",IE:"🇮🇪",PL:"🇵🇱",
      CZ:"🇨🇿",HU:"🇭🇺",RO:"🇷🇴",BG:"🇧🇬",HR:"🇭🇷",RS:"🇷🇸",SK:"🇸🇰",SI:"🇸🇮",GR:"🇬🇷",UA:"🇺🇦",
      BY:"🇧🇾",MD:"🇲🇩",RU:"🇷🇺",TR:"🇹🇷",JP:"🇯🇵",KR:"🇰🇷",CN:"🇨🇳",TW:"🇹🇼",HK:"🇭🇰",MO:"🇲🇴",
      IN:"🇮🇳",PK:"🇵🇰",BD:"🇧🇩",LK:"🇱🇰",NP:"🇳🇵",AF:"🇦🇫",SG:"🇸🇬",MY:"🇲🇾",ID:"🇮🇩",PH:"🇵🇭",
      TH:"🇹🇭",VN:"🇻🇳",MM:"🇲🇲",KH:"🇰🇭",LA:"🇱🇦",BN:"🇧🇳",TL:"🇹🇱",MX:"🇲🇽",BR:"🇧🇷",AR:"🇦🇷",
      CL:"🇨🇱",CO:"🇨🇴",PE:"🇵🇪",VE:"🇻🇪",EC:"🇪🇨",BO:"🇧🇴",UY:"🇺🇾",PY:"🇵🇾",GY:"🇬🇾",SR:"🇸🇷",
      AE:"🇦🇪",SA:"🇸🇦",QA:"🇶🇦",KW:"🇰🇼",BH:"🇧🇭",OM:"🇴🇲",YE:"🇾🇪",IL:"🇮🇱",JO:"🇯🇴",LB:"🇱🇧",
      SY:"🇸🇾",IQ:"🇮🇶",IR:"🇮🇷",CY:"🇨🇾",EG:"🇪🇬",MA:"🇲🇦",DZ:"🇩🇿",TN:"🇹🇳",LY:"🇱🇾",SD:"🇸🇩",
      NG:"🇳🇬",GH:"🇬🇭",SN:"🇸🇳",CI:"🇨🇮",CM:"🇨🇲",KE:"🇰🇪",ET:"🇪🇹",TZ:"🇹🇿",UG:"🇺🇬",RW:"🇷🇼",
      ZA:"🇿🇦",ZW:"🇿🇼",ZM:"🇿🇲",MZ:"🇲🇿",BW:"🇧🇼",NA:"🇳🇦",MW:"🇲🇼",MG:"🇲🇬",MU:"🇲🇺",AO:"🇦🇴",
      GE:"🇬🇪",AZ:"🇦🇿",AM:"🇦🇲",KZ:"🇰🇿",UZ:"🇺🇿",TM:"🇹🇲",KG:"🇰🇬",TJ:"🇹🇯",MN:"🇲🇳",KP:"🇰🇵",
      FJ:"🇫🇯",PG:"🇵🇬",WS:"🇼🇸",TO:"🇹🇴",SB:"🇸🇧",VU:"🇻🇺",IS:"🇮🇸",LU:"🇱🇺",MC:"🇲🇨",AD:"🇦🇩",
      LT:"🇱🇹",LV:"🇱🇻",EE:"🇪🇪",AL:"🇦🇱",MK:"🇲🇰",ME:"🇲🇪",BA:"🇧🇦",GT:"🇬🇹",SV:"🇸🇻",HN:"🇭🇳",
      NI:"🇳🇮",CR:"🇨🇷",PA:"🇵🇦",CU:"🇨🇺",JM:"🇯🇲",DO:"🇩🇴",HT:"🇭🇹",PR:"🇵🇷",TT:"🇹🇹",BB:"🇧🇧",
    };
    return flags[code] || "🌍";
  };

  const getRegion = (code) => {
    const americas = ["US","CA","MX","BR","AR","CL","CO","PE","VE","EC","BO","UY","PY","GY","SR","GT","SV","HN","NI","CR","PA","CU","JM","DO","HT","PR","TT","BB"];
    const europe = ["GB","DE","FR","IT","ES","PT","NL","BE","CH","AT","SE","NO","DK","FI","IE","PL","CZ","HU","RO","BG","HR","RS","SK","SI","GR","UA","BY","MD","RU","TR","LT","LV","EE","AL","MK","ME","BA","IS","LU","MC","AD"];
    const middleEast = ["AE","SA","QA","KW","BH","OM","YE","IL","JO","LB","SY","IQ","IR","CY","AF"];
    const africa = ["EG","MA","DZ","TN","LY","SD","NG","GH","SN","CI","CM","KE","ET","TZ","UG","RW","ZA","ZW","ZM","MZ","BW","NA","MW","MG","MU","AO"];
    const asia = ["JP","KR","CN","TW","HK","MO","IN","PK","BD","LK","NP","SG","MY","ID","PH","TH","VN","MM","KH","LA","BN","TL","GE","AZ","AM","KZ","UZ","TM","KG","TJ","MN","KP"];
    if (americas.includes(code)) return "Americas";
    if (europe.includes(code)) return "Europe";
    if (middleEast.includes(code)) return "Middle East";
    if (africa.includes(code)) return "Africa";
    if (asia.includes(code)) return "Asia";
    return "Pacific";
  };

  const copy = (text, key, successMsg) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
    if (successMsg) setToast({ message: successMsg, emoji: "✅" });
  };

  const saveProfile = () => {
    if (!profileName.trim()) return;
    const updated = { ...profiles, [profileName.trim()]: zones.map(z => z.name) };
    setProfiles(updated);
    localStorage.setItem("za_profiles", JSON.stringify(updated));
    localStorage.setItem("za_default_profile", profileName.trim());
    setProfileName("");
    setShowProfileSave(false);
    setToast({ message: `Saved! "${profileName.trim()}" loads automatically next time.`, emoji: "🎉" });
    setTimeout(() => setShowShareNudge(true), 3000);
  };

  const loadProfile = (name) => {
    const cityNames = profiles[name] || [];
    const loaded = cityNames.map(n => CITIES.find(c => c.name === n)).filter(Boolean);
    if (loaded.length) { setZones(loaded); setToast({ message: `"${name}" loaded! Your team is ready.`, emoji: "✅" }); }
  };

  const deleteProfile = (name) => {
    const updated = { ...profiles };
    delete updated[name];
    setProfiles(updated);
    localStorage.setItem("za_profiles", JSON.stringify(updated));
  };

  const generateInvite = () => {
    const lines = zones.map(z => {
      const off = getZoneTime(z.tz, now).getHours() - now.getHours();
      const lh = (mHour + off + 48) % 24;
      const ws = customHours[z.name] || { start: 9, end: 18 };
      const si = getStatusInfo(lh, ws);
      const icon = si.status === "work" ? "✅" : si.status === "awake" ? "⚠️" : "😴";
      return `${z.flag} ${z.name}: ${fmtH(lh, u24)} ${icon}`;
    });
    return `📅 Meeting time:\n${lines.join("\n")}\n\nScheduled with ZoneAtlas — zoneatlas.vercel.app`;
  };

  const generateDiscord = (format) => `<t:${toUnix(new Date(discordTime))}:${format}>`;

  const checkRecurring = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.map((month, i) => {
      const testDate = new Date(new Date().getFullYear(), i, 15, mHour, 0, 0);
      return {
        month,
        times: zones.map(z => {
          const lh = getZoneTime(z.tz, testDate).getHours();
          const ws = customHours[z.name] || { start: 9, end: 18 };
          return { city: z.name, flag: z.flag, hour: lh, si: getStatusInfo(lh, ws) };
        })
      };
    });
  };

  const getHeatmap = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days.map((day, di) => ({
      day,
      isWeekend: di === 0 || di === 6,
      hours: Array.from({ length: 24 }, (_, h) => {
        const count = zones.filter(z => {
          const off = getZoneTime(z.tz, now).getHours() - now.getHours();
          const lh = (h + off + 48) % 24;
          const ws = customHours[z.name] || { start: 9, end: 18 };
          return lh >= ws.start && lh < ws.end;
        }).length;
        return count;
      })
    }));
  };

  // Conflict detection for meeting planner
  const getMeetingConflicts = () => {
    const conflicts = [];
    zones.forEach(z => {
      const off = getZoneTime(z.tz, now).getHours() - now.getHours();
      const lh = (mHour + off + 48) % 24;
      const ws = customHours[z.name] || { start: 9, end: 18 };
      const si = getStatusInfo(lh, ws);
      if (si.status === "sleep") {
        conflicts.push({ city: z.name, flag: z.flag, hour: lh, type: "sleep" });
      } else if (si.status === "awake") {
        conflicts.push({ city: z.name, flag: z.flag, hour: lh, type: "outside_hours" });
      }
    });
    return conflicts;
  };

  const allInWorkHours = zones.length > 0 && zones.every(z => {
    const off = getZoneTime(z.tz, now).getHours() - now.getHours();
    const lh = (mHour + off + 48) % 24;
    const ws = customHours[z.name] || { start: 9, end: 18 };
    return lh >= ws.start && lh < ws.end;
  });

  const filtered = (() => {
    const q = search.toLowerCase().trim();
    let results = CITIES
      .filter(c => regionFilter === "All" || c.region === regionFilter)
      .filter(c => !zones.find(z => z.name === c.name));
    if (!q) return results;
    // Prioritise: exact start match > includes match
    const startMatch = results.filter(c => c.name.toLowerCase().startsWith(q));
    const includeMatch = results.filter(c => !c.name.toLowerCase().startsWith(q) && c.name.toLowerCase().includes(q));
    // Also match by country code
    const countryMatch = results.filter(c => !c.name.toLowerCase().includes(q) && c.country.toLowerCase() === q);
    return [...startMatch, ...includeMatch, ...countryMatch];
  })();

  const embedCode = `<iframe src="https://zoneatlas.vercel.app?embed=1&cities=${zones.map(z => encodeURIComponent(z.name)).join(",")}" width="100%" height="200" frameborder="0" style="border-radius:12px;border:none"></iframe>`;

  const greeting = getTimeGreeting(now.getHours());

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif", background: lightMode ? "#f5f7fa" : "#060d1f", color: lightMode ? "#1a1a2e" : "#eef4ff", minHeight: "100vh", overflowX: "hidden", transition: "background 0.3s, color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');
        :root {
          --bg: ${lightMode ? "#f5f7fa" : "#060d1f"};
          --bg2: ${lightMode ? "#ffffff" : "#0c1730"};
          --bg3: ${lightMode ? "#f0f2f5" : "#111f3d"};
          --border: ${lightMode ? "rgba(0,0,0,0.12)" : "rgba(0,200,255,0.18)"};
          --border2: ${lightMode ? "rgba(0,0,0,0.07)" : "rgba(0,200,255,0.09)"};
          --cyan: ${lightMode ? "#0070cc" : "#00c8ff"};
          --cyan-dim: ${lightMode ? "rgba(0,112,204,0.1)" : "rgba(0,200,255,0.12)"};
          --text: ${lightMode ? "#1a1a2e" : "#eef4ff"};
          --text2: ${lightMode ? "#4a5568" : "#8ba4cc"};
          --text3: ${lightMode ? "#9aa5b1" : "#4a6080"};
          --red: #ff4560;
          --green: #00c864;
          --yellow: #ffb400;
          --radius: 14px;
        }
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:var(--bg);font-family:'Plus Jakarta Sans','Inter',system-ui,sans-serif}
        input,button,select,textarea{font-family:'Plus Jakarta Sans','Inter',system-ui,sans-serif}
        button{cursor:pointer;border:none;background:none;color:inherit}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:var(--bg2)}
        ::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
        .pulse{animation:pulse 2s infinite}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        .fade-in{animation:fadeIn 0.3s ease}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        @keyframes slideUp{from{opacity:0;transform:translate(-50%,20px)}to{opacity:1;transform:translateX(-50%)}}
        @keyframes starFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
        @keyframes shimmer{0%{opacity:0.5}50%{opacity:1}100%{opacity:0.5}}
        .tab-btn{padding:10px 18px;border-radius:10px;font-size:13px;font-weight:700;transition:all 0.2s;color:var(--text2);border:1px solid transparent;white-space:nowrap}
        .tab-btn:hover{color:var(--text);background:rgba(255,255,255,0.04)}
        .tab-btn.active{background:var(--cyan-dim);border-color:var(--border);color:var(--cyan)}
        .zone-card{background:var(--bg2);border:1px solid var(--border2);border-radius:var(--radius);padding:18px;transition:border-color 0.2s,box-shadow 0.2s}
        .zone-card:hover{border-color:var(--border);box-shadow:0 4px 24px rgba(0,200,255,0.06)}
        .hour-cell{height:30px;flex:1;display:flex;align-items:center;justify-content:center;font-size:8px;font-family:'Space Mono',monospace;transition:all 0.15s;cursor:pointer;border-radius:3px}
        .faq-item{border-bottom:1px solid var(--border2);overflow:hidden}
        .faq-q{padding:20px 0;display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-size:16px;font-weight:700;color:var(--text);gap:12px;letter-spacing:-0.2px}
        .faq-q:hover{color:var(--cyan)}
        .faq-a{font-size:15px;color:var(--text2);line-height:1.75;padding-bottom:20px}
        .search-item{padding:11px 14px;cursor:pointer;display:flex;align-items:center;gap:10px;font-size:14px;border-radius:8px;font-weight:500;transition:background 0.1s}
        .search-item:hover{background:var(--bg3)}
        .meeting-slot{flex:1;height:38px;display:flex;align-items:center;justify-content:center;font-size:8px;font-family:'Space Mono',monospace;border-radius:3px;cursor:pointer;transition:all 0.15s;border:1px solid transparent}
        .meeting-slot.selected{border-color:var(--cyan)!important}
        .pill-btn{padding:5px 12px;border-radius:20px;font-size:12px;font-weight:600;border:1px solid var(--border2);background:transparent;color:var(--text2);cursor:pointer;transition:all 0.15s}
        .pill-btn:hover,.pill-btn.active{border-color:var(--border);color:var(--cyan);background:var(--cyan-dim)}
        .input-field{background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:8px 12px;color:var(--text);font-size:13px;outline:none}
        .input-field:focus{border-color:var(--cyan)}
        .action-btn{padding:8px 16px;border-radius:8px;background:var(--cyan-dim);border:1px solid var(--border);color:var(--cyan);font-size:12px;font-weight:700;cursor:pointer;transition:background 0.15s}
        .action-btn:hover{background:rgba(0,200,255,0.2)}
        .nudge-bar{background:linear-gradient(135deg,rgba(0,200,255,0.08),rgba(0,80,255,0.08));border:1px solid rgba(0,200,255,0.2);border-radius:10px;padding:10px 14px;display:flex;align-items:center;gap:10px;margin-bottom:12px;font-size:13px;color:var(--text2);animation:fadeIn 0.4s ease}
      `}</style>

      {/* Stars — dark mode only */}
      {!lightMode && (
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        {[...Array(50)].map((_, i) => (
          <div key={i} style={{ position: "absolute", width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, background: "white", borderRadius: "50%", left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: Math.random() * 0.4 + 0.1, animation: `starFloat ${Math.random() * 4 + 3}s ease-in-out ${Math.random() * 3}s infinite` }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(0,200,255,0.07) 0%, transparent 70%)" }} />
      </div>
      )}  {/* end stars */}

      {/* Toast */}
      {toast && <Toast message={toast.message} emoji={toast.emoji} onClose={() => setToast(null)} />}

      <div style={{ position: "relative", zIndex: 1, maxWidth: 980, margin: "0 auto", padding: "0 14px 80px" }}>

        {/* Header */}
        <div style={{ padding: "28px 0 16px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#00c8ff,#0050ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>🌐</div>
              <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-1px", color: "#eef4ff" }}>Zone<span style={{ color: "#00c8ff" }}>Atlas</span></h1>
            </div>
            {/* Dynamic greeting */}
            <p style={{ fontSize: 15, color: "#8ba4cc", fontWeight: 500 }}>
              {greeting.emoji} {greeting.text} <span style={{ color: "#4a6080", fontWeight: 400 }}>{greeting.sub}</span>
            </p>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
            {Object.keys(profiles).length > 0 && (
              <select onChange={e => { if (e.target.value) loadProfile(e.target.value); e.target.value = ""; }} className="input-field" style={{ fontSize: 12, padding: "6px 10px" }}>
                <option value="">Load team...</option>
                {Object.keys(profiles).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            )}
            <button onClick={() => setShowProfileSave(v => !v)} className="pill-btn" style={{ gap: 4, display: "flex", alignItems: "center" }}>💾 Save team</button>
            <button onClick={() => setShowEmbed(v => !v)} className="pill-btn">🔗 Embed</button>
            <button onClick={() => setU24(v => !v)} className={`pill-btn ${u24 ? "active" : ""}`}>{u24 ? "24h" : "12h"}</button>
            <button onClick={() => setLightMode(v => !v)} className="pill-btn" title={lightMode ? "Switch to dark mode" : "Switch to light mode"} style={{ fontSize: 15 }}>
              {lightMode ? "🌙" : "☀️"}
            </button>
            <button onClick={() => copy(window.location.href, "sharelink", "Link copied! Anyone opening it sees the same cities.")} className="pill-btn">📤 Share</button>
          </div>
        </div>

        {/* Onboarding progress dots */}
        {onboardStep < 3 && (
          <div className="fade-in" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, background: "rgba(0,200,255,0.06)", border: "1px solid rgba(0,200,255,0.12)", borderRadius: 10, padding: "10px 14px" }}>
            {[
              { n: 1, label: "Your time ✓", done: onboardStep >= 1 },
              { n: 2, label: "Add a city", done: onboardStep >= 2 },
              { n: 3, label: "See availability", done: onboardStep >= 3 },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: s.done ? "#00c864" : "rgba(0,200,255,0.15)", border: `1px solid ${s.done ? "#00c864" : "rgba(0,200,255,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: s.done ? "#060d1f" : "#00c8ff" }}>
                  {s.done ? "✓" : s.n}
                </div>
                <span style={{ fontSize: 12, color: s.done ? "#00c864" : "#8ba4cc", fontWeight: s.done ? 600 : 400 }}>{s.label}</span>
                {i < 2 && <span style={{ color: "#4a6080", fontSize: 12 }}>→</span>}
              </div>
            ))}
            <span style={{ marginLeft: "auto", fontSize: 11, color: "#4a6080" }}>Getting started</span>
          </div>
        )}

        {/* Save profile panel */}
        {showProfileSave && (
          <div className="fade-in" style={{ background: "#0c1730", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px", marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#eef4ff", marginBottom: 8 }}>Save your current cities as a team</p>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <input className="input-field" style={{ flex: 1, minWidth: 180 }} placeholder="e.g. My Dev Team, Client NYC" value={profileName} onChange={e => setProfileName(e.target.value)} onKeyDown={e => e.key === "Enter" && saveProfile()} autoFocus />
              <button onClick={saveProfile} style={{ padding: "8px 18px", borderRadius: 8, background: "#00c8ff", color: "#060d1f", fontSize: 13, fontWeight: 700 }}>Save</button>
            </div>
            {Object.keys(profiles).length > 0 && (
              <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, color: "#4a6080", marginRight: 4 }}>Saved teams:</span>
                {Object.keys(profiles).map(p => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: 4, background: "var(--bg3)", borderRadius: 8, padding: "3px 10px", fontSize: 12 }}>
                    <span style={{ color: "#8ba4cc", cursor: "pointer" }} onClick={() => loadProfile(p)}>{p}</span>
                    <span style={{ color: "#4a6080", cursor: "pointer" }} onClick={() => deleteProfile(p)}>✕</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Embed panel */}
        {showEmbed && (
          <div className="fade-in" style={{ background: "#0c1730", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px", marginBottom: 14 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#eef4ff", marginBottom: 4 }}>Embed this clock on any website or Notion page</p>
            <p style={{ fontSize: 12, color: "#4a6080", marginBottom: 10 }}>Shows your current cities updating in real time. Works in Notion, websites, and wikis.</p>
            <div style={{ background: "#111f3d", borderRadius: 8, padding: "10px 14px", fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00c8ff", wordBreak: "break-all", marginBottom: 8 }}>{embedCode}</div>
            <button onClick={() => copy(embedCode, "embed", "Embed code copied! Paste into any website or Notion page.")} className="action-btn">
              {copiedKey === "embed" ? "✓ Copied!" : "Copy embed code"}
            </button>
          </div>
        )}

        {/* Share nudge */}
        {showShareNudge && (
          <div className="nudge-bar">
            <span style={{ fontSize: 18 }}>📤</span>
            <span style={{ flex: 1 }}>Loving ZoneAtlas? Your teammates will thank you for sharing it.</span>
            <button onClick={() => { copy(window.location.href, "share", "Link copied!"); setShowShareNudge(false); }} className="action-btn" style={{ flexShrink: 0 }}>Share ZoneAtlas</button>
            <button onClick={() => setShowShareNudge(false)} style={{ color: "#4a6080", fontSize: 13, background: "none", border: "none", cursor: "pointer", padding: "0 6px" }}>✕</button>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid var(--border2)", paddingBottom: 10, overflowX: "auto" }}>
          {[
            ["clock", "🕐 World Clock", "Live clocks + sleep overlay"],
            ["planner", "📅 Meeting Planner", "Find the best meeting time"],
            ["heatmap", "🔥 Team Overlap", "Weekly availability heatmap"],
            ["discord", "💬 Discord Times", "Auto-timezone timestamps"],
            ["recurring", "🔄 Recurring Check", "DST impact on weekly meetings"],
            ["converter", "🔃 Converter", "Convert any time instantly"],
          ].map(([id, label, desc]) => (
            <button key={id} className={`tab-btn ${tab === id ? "active" : ""}`} onClick={() => {
              setTab(id);
              if (id === "planner" && !seenTooltips["tip_planner"]) {
                setTimeout(() => { setActiveTooltip({ key: "tip_planner", text: "Drag the slider to find a time that works for everyone. Green slots = everyone's in work hours." }); markTooltip("tip_planner"); }, 400);
              }
              if (id === "heatmap" && !seenTooltips["tip_heatmap"]) {
                setTimeout(() => { setActiveTooltip({ key: "tip_heatmap", text: "Darker green = more people available. Click any cell to set that as your meeting hour." }); markTooltip("tip_heatmap"); }, 400);
              }
              if (id === "discord" && !seenTooltips["tip_discord"]) {
                setTimeout(() => { setActiveTooltip({ key: "tip_discord", text: "Paste these codes into Discord — they show in every user's local time automatically." }); markTooltip("tip_discord"); }, 400);
              }
            }}
              title={desc}>
              {label}
            </button>
          ))}
        </div>

        {/* Active tooltip bar */}
        {activeTooltip && <Tooltip text={activeTooltip.text} onClose={() => setActiveTooltip(null)} />}

        {/* ── WORLD CLOCK TAB ── */}
        {tab === "clock" && (
          <div className="fade-in">
            {/* Quick picks for onboarding */}
            {zones.length < 2 && (
              <div className="fade-in" style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 12, color: "#4a6080", marginBottom: 8, fontWeight: 600 }}>Quick add — where is your team?</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {QUICK_PICKS.filter(n => !zones.find(z => z.name === n)).map(name => {
                    const city = CITIES.find(c => c.name === name);
                    return city ? (
                      <button key={name} onClick={() => addZone(city)} style={{ padding: "6px 12px", borderRadius: 20, background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.15)", color: "#8ba4cc", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#00c8ff"; e.currentTarget.style.color = "#00c8ff"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,200,255,0.15)"; e.currentTarget.style.color = "#8ba4cc"; }}>
                        {city.flag} {name}
                      </button>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))", gap: 10, marginBottom: 16 }}>
              {zones.map((zone, idx) => {
                const t = getZoneTime(zone.tz, now);
                const h = t.getHours();
                const ws = customHours[zone.name] || { start: 9, end: 18 };
                const si = getStatusInfo(h, ws);
                const holiday = checkHoliday(zone.tz, now);
                return (
                  <div key={idx} className="zone-card fade-in">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 18 }}>{zone.flag}</span>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.2px" }}>{zone.name}</div>
                          <div style={{ fontSize: 10, color: "#4a6080" }}>{getOffset(zone.tz)}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 2 }}>
                        <button onClick={() => setShowCustomHours(showCustomHours === idx ? null : idx)} style={{ padding: "2px 5px", color: "#4a6080", fontSize: 12 }} title="Set work hours">⚙️</button>
                        <button onClick={() => removeZone(idx)} style={{ padding: "2px 5px", color: "#4a6080", fontSize: 13 }}>✕</button>
                      </div>
                    </div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 22, fontWeight: 700, color: "#00c8ff", marginBottom: 4, letterSpacing: "0.5px" }}>{fmt(t, u24)}</div>
                    <div style={{ fontSize: 11, color: "#8ba4cc", marginBottom: 6 }}>{getDateStr(zone.tz, now)}</div>
                    {holiday && <div style={{ fontSize: 11, color: "#ffb400", marginBottom: 4 }}>🎉 {holiday.n} today</div>}
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: si.color, flexShrink: 0 }} className={si.status === "work" ? "pulse" : ""} />
                      <span style={{ fontSize: 12, color: si.color, fontWeight: 600 }}>{si.label}</span>
                    </div>
                    {showCustomHours === idx && (
                      <div className="fade-in" style={{ marginTop: 10, padding: "8px 10px", background: "#111f3d", borderRadius: 8, border: "1px solid var(--border2)" }}>
                        <p style={{ fontSize: 11, color: "#8ba4cc", marginBottom: 6, fontWeight: 600 }}>Work hours for {zone.name}</p>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <input type="number" min="0" max="23" value={ws.start} onChange={e => setCustomHours(ch => ({ ...ch, [zone.name]: { ...ws, start: +e.target.value } }))} className="input-field" style={{ width: 52, padding: "4px 6px", fontSize: 12 }} />
                          <span style={{ color: "#4a6080", fontSize: 12 }}>to</span>
                          <input type="number" min="0" max="23" value={ws.end} onChange={e => setCustomHours(ch => ({ ...ch, [zone.name]: { ...ws, end: +e.target.value } }))} className="input-field" style={{ width: 52, padding: "4px 6px", fontSize: 12 }} />
                          <span style={{ fontSize: 11, color: "#4a6080" }}>hr</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Add city card */}
              {zones.length < 8 && (
                <div style={{ position: "relative" }}>
                  <button onClick={() => setShowSearch(v => !v)} style={{ width: "100%", minHeight: zones.length === 0 ? 160 : 140, borderRadius: "var(--radius)", border: `1px dashed ${zones.length === 0 ? "rgba(0,200,255,0.4)" : "var(--border)"}`, background: zones.length === 0 ? "rgba(0,200,255,0.04)" : "transparent", color: zones.length === 0 ? "#00c8ff" : "#4a6080", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 13, fontWeight: 600, transition: "all 0.2s", animation: zones.length === 0 ? "shimmer 2s infinite" : "none" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#00c8ff"; e.currentTarget.style.color = "#00c8ff"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = zones.length === 0 ? "rgba(0,200,255,0.4)" : "var(--border)"; e.currentTarget.style.color = zones.length === 0 ? "#00c8ff" : "#4a6080"; }}>
                    <span style={{ fontSize: 24 }}>＋</span>
                    <span>{zones.length === 0 ? "Add your first city" : "Add a city"}</span>
                    {zones.length === 0 && <span style={{ fontSize: 11, color: "rgba(0,200,255,0.6)", fontWeight: 400 }}>Search or pick from quick adds above</span>}
                  </button>
                  {showSearch && (
                    <div className="fade-in" style={{ position: "absolute", top: "105%", left: 0, right: 0, zIndex: 50, background: "#0c1730", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", minWidth: 240 }}>
                      <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--border2)" }}>
                        <input autoFocus value={search} onChange={e => {
                          setSearch(e.target.value);
                          searchGeoNames(e.target.value);
                        }} placeholder="Search any city in the world..." style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "var(--text)", fontSize: 14, fontFamily: "'Plus Jakarta Sans', system-ui" }} />
                      </div>
                      <div style={{ display: "flex", gap: 4, padding: "6px 10px", flexWrap: "wrap", borderBottom: "1px solid var(--border2)" }}>
                        {REGIONS.map(r => (
                          <button key={r} className={`pill-btn ${regionFilter === r ? "active" : ""}`} style={{ fontSize: 11, padding: "3px 8px" }} onClick={() => setRegionFilter(r)}>{r}</button>
                        ))}
                      </div>
                      <div style={{ maxHeight: 260, overflowY: "auto" }}>
                        {geoLoading && (
                          <div style={{ padding: "12px 14px", fontSize: 12, color: "var(--text3)", textAlign: "center" }}>🔍 Searching 40,000+ cities...</div>
                        )}
                        {geoError && (
                          <div style={{ padding: "12px 14px", fontSize: 12, color: "var(--yellow)", textAlign: "center" }}>⚠️ Search unavailable — showing local results</div>
                        )}
                        {search.length >= 3 && !geoLoading && geoSearch.length > 0 ? (
                          <>
                            <div style={{ padding: "4px 14px", fontSize: 10, color: "var(--text3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              🌍 Global search results
                            </div>
                            {geoSearch.map((c, i) => (
                              <div key={i} className="search-item" onClick={() => addZone(c)}>
                                <span>{c.flag}</span>
                                <span style={{ flex: 1 }}>
                                  {c.name}
                                  {c.adminName && <span style={{ fontSize: 11, color: "var(--text3)", marginLeft: 4 }}>{c.adminName}</span>}
                                </span>
                                <span style={{ color: "var(--text3)", fontSize: 10, fontFamily: "'Space Mono', monospace" }}>{getOffset(c.tz)}</span>
                              </div>
                            ))}
                          </>
                        ) : search.length >= 3 && !geoLoading ? (
                          <>
                            <div style={{ padding: "4px 14px", fontSize: 10, color: "var(--text3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              Local results
                            </div>
                            {filtered.slice(0, 25).map(c => (
                              <div key={c.name} className="search-item" onClick={() => addZone(c)}>
                                <span>{c.flag}</span><span style={{ flex: 1 }}>{c.name}</span>
                                <span style={{ color: "var(--text3)", fontSize: 10, fontFamily: "'Space Mono', monospace" }}>{getOffset(c.tz)}</span>
                              </div>
                            ))}
                            {filtered.length === 0 && <div style={{ padding: "16px", color: "var(--text3)", fontSize: 13, textAlign: "center" }}>No cities found</div>}
                          </>
                        ) : (
                          <>
                            <div style={{ padding: "4px 14px", fontSize: 10, color: "var(--text3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              Popular cities
                            </div>
                            {filtered.slice(0, 20).map(c => (
                              <div key={c.name} className="search-item" onClick={() => addZone(c)}>
                                <span>{c.flag}</span><span style={{ flex: 1 }}>{c.name}</span>
                                <span style={{ color: "var(--text3)", fontSize: 10, fontFamily: "'Space Mono', monospace" }}>{getOffset(c.tz)}</span>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Meeting planner nudge after 3+ cities */}
            {zones.length >= 3 && tab === "clock" && (
              <div className="nudge-bar">
                <span style={{ fontSize: 18 }}>📅</span>
                <span style={{ flex: 1, fontSize: 13 }}>Ready to find the best meeting time for all <strong style={{ color: "#eef4ff" }}>{zones.length} cities</strong>?</span>
                <button onClick={() => setTab("planner")} className="action-btn" style={{ flexShrink: 0 }}>Open Meeting Planner →</button>
              </div>
            )}

            {/* 24h Timeline */}
            {zones.length >= 2 && (
              <div style={{ background: "#0c1730", border: "1px solid var(--border2)", borderRadius: 12, padding: "16px", marginBottom: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, color: "#8ba4cc", letterSpacing: "-0.2px" }}>24-Hour Sleep-Aware Timeline</div>
                <div style={{ overflowX: "auto" }}>
                  <div style={{ display: "flex", minWidth: 520, marginBottom: 3 }}>
                    <div style={{ width: 110, flexShrink: 0 }} />
                    {[0, 4, 8, 12, 16, 20].map(h => (
                      <div key={h} style={{ flex: "0 0 calc((100% - 110px)/6)", fontSize: 9, color: "#4a6080", fontFamily: "'Space Mono', monospace" }}>{fmtH(h, u24)}</div>
                    ))}
                  </div>
                  {zones.map((zone, zi) => {
                    const off = getZoneTime(zone.tz, now).getHours() - now.getHours();
                    const ws = customHours[zone.name] || { start: 9, end: 18 };
                    return (
                      <div key={zi} style={{ display: "flex", minWidth: 520, marginBottom: 3, alignItems: "center" }}>
                        <div style={{ width: 110, flexShrink: 0, display: "flex", alignItems: "center", gap: 5 }}>
                          <span style={{ fontSize: 13 }}>{zone.flag}</span>
                          <span style={{ fontSize: 11, color: "#8ba4cc", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 85 }}>{zone.name}</span>
                        </div>
                        <div style={{ display: "flex", flex: 1, gap: 1 }}>
                          {Array.from({ length: 24 }, (_, h) => {
                            const lh = (h + off + 48) % 24;
                            const si = getStatusInfo(lh, ws);
                            const isNow = Math.abs(lh - getZoneTime(zone.tz, now).getHours()) < 1;
                            const isHov = hoverH === h;
                            let bg = si.bg;
                            if (isHov) bg = "rgba(0,200,255,0.2)";
                            if (isNow) bg = "rgba(0,200,255,0.4)";
                            return (
                              <div key={h} className="hour-cell" style={{ background: bg, border: isNow ? "1px solid #00c8ff" : isHov ? "1px solid rgba(0,200,255,0.3)" : "1px solid transparent", color: isNow ? "#00c8ff" : "transparent" }}
                                onMouseEnter={() => setHoverH(h)} onMouseLeave={() => setHoverH(null)} title={`${fmtH(lh, u24)} in ${zone.name} — ${si.label}`}>
                                {isNow ? "▼" : ""}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", gap: 14, marginTop: 8, flexWrap: "wrap" }}>
                  {[["rgba(0,200,100,0.2)", "Work hrs"], ["rgba(255,180,0,0.12)", "Awake"], ["rgba(255,255,255,0.02)", "Sleeping"], ["rgba(0,200,255,0.4)", "Now"]].map(([bg, l]) => (
                    <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 3, background: bg, border: l === "Now" ? "1px solid #00c8ff" : "none" }} />
                      <span style={{ fontSize: 10, color: "#4a6080" }}>{l}</span>
                    </div>
                  ))}
                </div>
                {!seenTooltips["tip_timeline"] && (
                  <div style={{ marginTop: 8, fontSize: 11, color: "rgba(0,200,255,0.6)" }} onClick={() => markTooltip("tip_timeline")}>
                    💡 Hover any hour to see all times · Click ⚙️ on a card to set custom work hours
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── MEETING PLANNER TAB ── */}
        {tab === "planner" && (
          <div className="fade-in">
            {zones.length < 2 && (
              <div className="nudge-bar">
                <span>💡</span>
                <span>Add at least 2 cities on the World Clock tab to use the meeting planner.</span>
                <button onClick={() => setTab("clock")} className="action-btn">Add cities →</button>
              </div>
            )}

            <div style={{ background: "#0c1730", border: "1px solid var(--border2)", borderRadius: 12, padding: 18, marginBottom: 14 }}>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: "#4a6080", marginBottom: 6, fontWeight: 600 }}>Choose meeting time (based on {zones[0]?.name || "first city"})</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <input type="range" min="0" max="23" value={mHour} onChange={e => setMHour(+e.target.value)} style={{ accentColor: "#00c8ff", width: 200 }} />
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, color: "#00c8ff", fontWeight: 700 }}>{fmtH(mHour, u24)}</span>
                  {allInWorkHours && <span style={{ fontSize: 12, color: "#00c864", fontWeight: 700, background: "rgba(0,200,100,0.12)", padding: "4px 10px", borderRadius: 20 }}>🎯 Perfect — everyone's in work hours!</span>}
                </div>
              </div>

              {/* Conflict warnings */}
              {getMeetingConflicts().length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  {getMeetingConflicts().map(c => (
                    <div key={c.city} style={{ fontSize: 12, color: c.type === "sleep" ? "#ff4560" : "#ffb400", background: c.type === "sleep" ? "rgba(255,69,96,0.08)" : "rgba(255,180,0,0.08)", border: `1px solid ${c.type === "sleep" ? "rgba(255,69,96,0.2)" : "rgba(255,180,0,0.2)"}`, borderRadius: 8, padding: "7px 12px", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                      {c.type === "sleep" ? "😴" : "⚠️"}
                      <strong>{c.flag} {c.city}</strong> — {fmtH(c.hour, u24)} · {c.type === "sleep" ? "Likely sleeping" : "Outside work hours"}
                    </div>
                  ))}
                </div>
              )}

              <div style={{ overflowX: "auto" }}>
                {zones.map((zone, zi) => {
                  const off = getZoneTime(zone.tz, now).getHours() - now.getHours();
                  const ws = customHours[zone.name] || { start: 9, end: 18 };
                  return (
                    <div key={zi} style={{ display: "flex", minWidth: 480, marginBottom: 4, alignItems: "center" }}>
                      <div style={{ width: 110, flexShrink: 0, display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ fontSize: 13 }}>{zone.flag}</span>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 85 }}>{zone.name}</div>
                          <div style={{ fontSize: 9, color: "#4a6080" }}>{getOffset(zone.tz)}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", flex: 1, gap: 1 }}>
                        {Array.from({ length: 24 }, (_, h) => {
                          const lh = (h + off + 48) % 24;
                          const si = getStatusInfo(lh, ws);
                          const isSel = h === mHour;
                          return (
                            <div key={h} className={`meeting-slot${isSel ? " selected" : ""}`} style={{ background: isSel ? "rgba(0,200,255,0.35)" : si.bg, borderColor: isSel ? "#00c8ff" : "transparent", color: isSel ? "#00c8ff" : "transparent", fontSize: 9 }} onClick={() => setMHour(h)} title={`${fmtH(lh, u24)} in ${zone.name} — ${si.label}`}>
                              {isSel ? fmtH(lh, u24) : ""}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Meeting summary + invite */}
              <div style={{ marginTop: 14, padding: "14px", background: "#111f3d", borderRadius: 10, border: "1px solid var(--border2)" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#00c8ff", marginBottom: 10, letterSpacing: "-0.2px" }}>Meeting Summary</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 6, marginBottom: 12 }}>
                  {zones.map((zone, i) => {
                    const off = getZoneTime(zone.tz, now).getHours() - now.getHours();
                    const lh = (mHour + off + 48) % 24;
                    const ws = customHours[zone.name] || { start: 9, end: 18 };
                    const si = getStatusInfo(lh, ws);
                    return (
                      <div key={i} style={{ fontSize: 12, fontWeight: 600 }}>
                        {zone.flag} {zone.name}: <span style={{ fontFamily: "'Space Mono', monospace", color: "#00c8ff" }}>{fmtH(lh, u24)}</span>
                        <span style={{ marginLeft: 4 }}>{si.status === "work" ? "✅" : si.status === "awake" ? "⚠️" : "😴"}</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00c8ff", background: "#060d1f", padding: "10px 12px", borderRadius: 8, whiteSpace: "pre-wrap", marginBottom: 10 }}>{generateInvite()}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <button onClick={() => copy(generateInvite(), "invite", "Invite text copied! Paste it straight into Slack or email.")} className="action-btn">
                    {copiedKey === "invite" ? "✓ Copied!" : "📋 Copy invite text"}
                  </button>
                  <a href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Team+Meeting&dates=${new Date().toISOString().split("T")[0].replace(/-/g,"")}&details=${encodeURIComponent(generateInvite())}`} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid var(--border2)", color: "#8ba4cc", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>📅 Google Calendar</a>
                  <a href={`https://outlook.live.com/calendar/0/deeplink/compose?subject=Team+Meeting&body=${encodeURIComponent(generateInvite())}`} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid var(--border2)", color: "#8ba4cc", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>📅 Outlook</a>
                </div>
              </div>

              {/* Best windows */}
              <div style={{ marginTop: 12, background: "rgba(0,200,255,0.04)", border: "1px solid rgba(0,200,255,0.1)", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#00c8ff", marginBottom: 8 }}>Best Windows Today</div>
                {(() => {
                  const work = [], awake = [];
                  for (let h = 0; h < 24; h++) {
                    const allW = zones.every(z => { const o = getZoneTime(z.tz, now).getHours() - now.getHours(); const lh = (h + o + 48) % 24; const ws = customHours[z.name] || { start: 9, end: 18 }; return lh >= ws.start && lh < ws.end; });
                    const allA = zones.every(z => { const o = getZoneTime(z.tz, now).getHours() - now.getHours(); const lh = (h + o + 48) % 24; return lh >= 7 && lh < 22; });
                    if (allW) work.push(h); else if (allA) awake.push(h);
                  }
                  if (!work.length && !awake.length) return <p style={{ fontSize: 13, color: "#ff4560" }}>No overlap where everyone is awake. Consider asynchronous communication or a rotating meeting schedule.</p>;
                  return (
                    <div style={{ fontSize: 14, color: "#8ba4cc", lineHeight: 1.9 }}>
                      {work.length > 0 && <div>✅ <strong style={{ color: "#eef4ff" }}>Everyone in work hours:</strong> {work.map(h => fmtH(h, u24)).join(", ")} <span style={{ fontSize: 12, color: "#4a6080" }}>(based on {zones[0]?.name})</span></div>}
                      {awake.length > 0 && <div>⚠️ <strong style={{ color: "#eef4ff" }}>All awake, outside work:</strong> {awake.map(h => fmtH(h, u24)).join(", ")}</div>}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Scheduling affiliate nudge */}
            <div style={{ background: "rgba(0,200,255,0.04)", border: "1px solid rgba(0,200,255,0.1)", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#8ba4cc", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 16 }}>📆</span>
              <span style={{ flex: 1 }}>Scheduling lots of meetings? Let people book time with you directly — no back-and-forth emails.</span>
              <a href="https://cal.com" target="_blank" rel="noopener noreferrer" style={{ padding: "6px 14px", borderRadius: 8, background: "rgba(0,200,255,0.12)", border: "1px solid rgba(0,200,255,0.2)", color: "#00c8ff", fontSize: 12, fontWeight: 700, textDecoration: "none", flexShrink: 0 }}>Try Cal.com free →</a>
            </div>
          </div>
        )}

        {/* ── HEATMAP TAB ── */}
        {tab === "heatmap" && (
          <div className="fade-in">
            {zones.length < 2 && (
              <div className="nudge-bar">
                <span>💡</span>
                <span>Add at least 2 cities on the World Clock tab to see the team overlap heatmap.</span>
                <button onClick={() => setTab("clock")} className="action-btn">Add cities →</button>
              </div>
            )}
            <div style={{ background: "#0c1730", border: "1px solid var(--border2)", borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#eef4ff", marginBottom: 4, letterSpacing: "-0.3px" }}>Team Availability Heatmap</div>
              <p style={{ fontSize: 14, color: "#8ba4cc", marginBottom: 16, lineHeight: 1.65 }}>See when the most team members are in work hours across the entire week. Darker green = more people available. Click any cell to set as your meeting hour.</p>
              <div style={{ overflowX: "auto" }}>
                <div style={{ display: "flex", minWidth: 580 }}>
                  <div style={{ width: 44, flexShrink: 0 }} />
                  {Array.from({ length: 24 }, (_, h) => (
                    <div key={h} style={{ flex: 1, fontSize: 8, color: "#4a6080", textAlign: "center", fontFamily: "'Space Mono', monospace" }}>
                      {h % 4 === 0 ? fmtH(h, u24) : ""}
                    </div>
                  ))}
                </div>
                {getHeatmap().map(({ day, hours, isWeekend }) => (
                  <div key={day} style={{ display: "flex", minWidth: 580, marginBottom: 2, alignItems: "center" }}>
                    <div style={{ width: 44, flexShrink: 0, fontSize: 12, color: isWeekend ? "#4a6080" : "#8ba4cc", fontWeight: 700 }}>{day}</div>
                    {hours.map((count, h) => {
                      const maxC = Math.max(zones.length, 1);
                      const ratio = count / maxC;
                      const bg = count === 0 ? "rgba(255,255,255,0.02)" :
                        ratio >= 1 ? "rgba(0,200,100,0.55)" :
                        ratio >= 0.5 ? "rgba(0,200,100,0.3)" :
                        "rgba(255,180,0,0.2)";
                      return (
                        <div key={h} style={{ flex: 1, height: 28, background: bg, borderRadius: 3, margin: "0 1px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: count > 0 ? "rgba(255,255,255,0.7)" : "transparent", cursor: "pointer", transition: "opacity 0.15s" }}
                          onClick={() => { setMHour(h); setTab("planner"); setToast({ message: `Meeting planner set to ${fmtH(h, u24)}. Check the summary below.`, emoji: "📅" }); }}
                          title={`${day} ${fmtH(h, u24)}: ${count}/${zones.length} available — click to use in planner`}
                          onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                          onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                          {count > 0 ? count : ""}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
                {[["rgba(0,200,100,0.55)", "All available"], ["rgba(0,200,100,0.3)", "Most available"], ["rgba(255,180,0,0.2)", "Some available"], ["rgba(255,255,255,0.02)", "None"]].map(([bg, l]) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 3, background: bg }} />
                    <span style={{ fontSize: 11, color: "#4a6080" }}>{l}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12, color: "#4a6080", marginTop: 10 }}>💡 Click any green cell to instantly set that time in the Meeting Planner. Set custom hours per city using the ⚙️ icon on clock cards.</p>
            </div>
          </div>
        )}

        {/* ── DISCORD TIMESTAMPS TAB ── */}
        {tab === "discord" && (
          <div className="fade-in">
            <div style={{ background: "#0c1730", border: "1px solid var(--border2)", borderRadius: 12, padding: 18, marginBottom: 14 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#eef4ff", marginBottom: 4, letterSpacing: "-0.3px" }}>Discord Timestamp Generator</div>
              <p style={{ fontSize: 14, color: "#8ba4cc", marginBottom: 16, lineHeight: 1.65 }}>Generate timestamps that automatically show in every Discord user's local time. Perfect for game events, stream times, and server announcements. Paste directly into any Discord message.</p>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: "#4a6080", marginBottom: 6, fontWeight: 600 }}>Select date and time for your event</div>
                <input type="datetime-local" value={discordTime} onChange={e => setDiscordTime(e.target.value)} className="input-field" style={{ fontSize: 14 }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 8 }}>
                {[
                  { format: "t", label: "Short Time", example: "9:01 PM", desc: "Great for quick time references" },
                  { format: "T", label: "Long Time", example: "9:01:00 PM", desc: "When seconds matter" },
                  { format: "d", label: "Short Date", example: "20/04/2024", desc: "For date-only references" },
                  { format: "D", label: "Long Date", example: "20 April 2024", desc: "Formal announcements" },
                  { format: "f", label: "Date and Time", example: "20 April 2024 9:01 PM", desc: "Most common choice" },
                  { format: "F", label: "Full Date and Time", example: "Tuesday, 20 April 2024", desc: "For important events" },
                  { format: "R", label: "Relative", example: "in 2 hours / 3 days ago", desc: "Live countdown — updates automatically!" },
                ].map(({ format, label, example, desc }) => {
                  const code = generateDiscord(format);
                  const key = `discord_${format}`;
                  return (
                    <div key={format} style={{ background: "#111f3d", borderRadius: 10, padding: "12px 14px", border: "1px solid var(--border2)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#eef4ff" }}>{label}</span>
                        {format === "R" && <span style={{ fontSize: 10, color: "#00c864", background: "rgba(0,200,100,0.12)", padding: "2px 6px", borderRadius: 20, fontWeight: 700 }}>Live</span>}
                      </div>
                      <div style={{ fontSize: 11, color: "#4a6080", marginBottom: 8 }}>{desc} · e.g. {example}</div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00c8ff", background: "#060d1f", padding: "8px 10px", borderRadius: 6, marginBottom: 8, wordBreak: "break-all" }}>{code}</div>
                      <button onClick={() => copy(code, key, `"${label}" timestamp copied! Paste it into Discord.`)} className="action-btn" style={{ fontSize: 11, padding: "5px 12px" }}>
                        {copiedKey === key ? "✓ Copied!" : "Copy"}
                      </button>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 14, padding: "12px 14px", background: "var(--bg3)", borderRadius: 10, border: "1px solid var(--border2)" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>How to use in Discord</p>
                <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7 }}>Copy any code above and paste it directly into a Discord message or announcement. Every viewer automatically sees it in their own local timezone — no conversion needed from your viewers.</p>
                <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 6 }}>Works in: servers, DMs, announcements, bots, and embeds.</p>
              </div>

              {/* VPN affiliate — streaming/gaming audience */}
              <div style={{ marginTop: 12, background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>🛡️</span>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", margin: "0 0 2px" }}>Streaming or gaming internationally?</p>
                  <p style={{ fontSize: 12, color: "var(--text2)", margin: 0 }}>A VPN keeps your connection stable and secure across borders. NordVPN and ExpressVPN are trusted by millions of streamers worldwide.</p>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0, flexWrap: "wrap" }}>
                  <a href="https://nordvpn.com" target="_blank" rel="noopener noreferrer" style={{ padding: "6px 14px", borderRadius: 8, background: "rgba(62,133,251,0.15)", border: "1px solid rgba(62,133,251,0.3)", color: "#6ba3ff", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>NordVPN →</a>
                  <a href="https://expressvpn.com" target="_blank" rel="noopener noreferrer" style={{ padding: "6px 14px", borderRadius: 8, background: "rgba(218,62,42,0.1)", border: "1px solid rgba(218,62,42,0.25)", color: "#ff7a6b", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>ExpressVPN →</a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── RECURRING MEETING TAB ── */}
        {tab === "recurring" && (
          <div className="fade-in">
            {zones.length < 2 && (
              <div className="nudge-bar">
                <span>💡</span>
                <span>Add at least 2 cities on the World Clock tab to check recurring meetings.</span>
                <button onClick={() => setTab("clock")} className="action-btn">Add cities →</button>
              </div>
            )}
            <div style={{ background: "#0c1730", border: "1px solid var(--border2)", borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#eef4ff", marginBottom: 4, letterSpacing: "-0.3px" }}>Recurring Meeting DST Checker</div>
              <p style={{ fontSize: 14, color: "#8ba4cc", marginBottom: 16, lineHeight: 1.65 }}>See exactly how Daylight Saving Time shifts your weekly meeting throughout the year. If the time changes in any city, you'll see it highlighted here — so there are no surprises.</p>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: "#4a6080", marginBottom: 6, fontWeight: 600 }}>Your recurring meeting time in {zones[0]?.name || "first city"}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <input type="range" min="0" max="23" value={mHour} onChange={e => setMHour(+e.target.value)} style={{ accentColor: "#00c8ff", width: 200 }} />
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, color: "#00c8ff", fontWeight: 700 }}>{fmtH(mHour, u24)} every week</span>
                </div>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 3px", minWidth: 480 }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", fontSize: 11, color: "#4a6080", padding: "4px 8px", fontWeight: 700 }}>Month</th>
                      {zones.map(z => <th key={z.name} style={{ textAlign: "center", fontSize: 11, color: "#4a6080", padding: "4px 8px", fontWeight: 700 }}>{z.flag} {z.name}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {checkRecurring().map(({ month, times }, ri) => {
                      const prevTimes = ri > 0 ? checkRecurring()[ri - 1].times : null;
                      const hasDSTChange = prevTimes && times.some((t, i) => t.hour !== prevTimes[i].hour);
                      return (
                        <tr key={month} style={{ background: hasDSTChange ? "rgba(255,180,0,0.05)" : "transparent" }}>
                          <td style={{ padding: "7px 8px", fontSize: 13, fontWeight: 700, color: "#8ba4cc" }}>
                            {month}
                            {hasDSTChange && <span style={{ marginLeft: 6, fontSize: 10, color: "#ffb400", fontWeight: 700 }}>DST ⚡</span>}
                          </td>
                          {times.map(({ city, flag, hour, si }) => (
                            <td key={city} style={{ textAlign: "center", padding: "7px 8px" }}>
                              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: si.color, fontWeight: 700 }}>{fmtH(hour, u24)}</span>
                              <span style={{ marginLeft: 4, fontSize: 11 }}>{si.status === "work" ? "✅" : si.status === "awake" ? "⚠️" : "😴"}</span>
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 12, padding: "10px 14px", background: "#111f3d", borderRadius: 8, fontSize: 12, color: "#8ba4cc", lineHeight: 1.7 }}>
                <span style={{ color: "#ffb400", fontWeight: 700 }}>⚡ DST</span> rows show months where clocks change in one or more cities. ✅ Work hours · ⚠️ Awake but outside work hours · 😴 Sleeping
              </div>
            </div>
          </div>
        )}

        {/* ── CONVERTER TAB ── */}
        {tab === "converter" && (
          <div className="fade-in">
            <div style={{ background: "#0c1730", border: "1px solid var(--border2)", borderRadius: 12, padding: 18, marginBottom: 14 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#eef4ff", marginBottom: 14, letterSpacing: "-0.3px" }}>Time Converter</div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: "#4a6080", marginBottom: 6, fontWeight: 600 }}>What time in {zones[0]?.name || "first city"}?</div>
                <select value={mHour} onChange={e => setMHour(+e.target.value)} className="input-field" style={{ fontSize: 14 }}>
                  {Array.from({ length: 24 }, (_, h) => <option key={h} value={h}>{fmtH(h, u24)}</option>)}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 16 }}>
                {zones.map((zone, i) => {
                  const off = getZoneTime(zone.tz, now).getHours() - now.getHours();
                  const lh = (mHour + off + 48) % 24;
                  const crossDay = mHour + off >= 24 ? "+1 day" : mHour + off < 0 ? "-1 day" : "";
                  const ws = customHours[zone.name] || { start: 9, end: 18 };
                  const si = getStatusInfo(lh, ws);
                  const holiday = checkHoliday(zone.tz, now);
                  return (
                    <div key={i} style={{ background: "#111f3d", border: "1px solid var(--border2)", borderRadius: 10, padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 20 }}>{zone.flag}</span>
                        <div>
                          <div style={{ fontSize: 12, color: "#8ba4cc", fontWeight: 600 }}>{zone.name}</div>
                          <div style={{ fontSize: 10, color: "#4a6080" }}>{getOffset(zone.tz)}</div>
                        </div>
                      </div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 20, fontWeight: 700, color: "#00c8ff", marginBottom: 3 }}>
                        {fmtH(lh, u24)}{crossDay && <span style={{ fontSize: 10, color: "#4a6080", marginLeft: 5 }}>{crossDay}</span>}
                      </div>
                      <div style={{ fontSize: 12, color: si.color, fontWeight: 600 }}>{si.status === "work" ? "✅ Working" : si.status === "awake" ? "⚠️ Awake" : "😴 Sleeping"}</div>
                      {holiday && <div style={{ fontSize: 11, color: "#ffb400", marginTop: 2 }}>🎉 {holiday.n}</div>}
                    </div>
                  );
                })}
              </div>
              <div style={{ background: "#111f3d", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#8ba4cc", marginBottom: 8 }}>Paste-ready string for Slack / email</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#00c8ff", background: "#060d1f", padding: "10px 12px", borderRadius: 8, lineHeight: 1.9, wordBreak: "break-all", marginBottom: 8 }}>
                  {zones.length > 0 ? zones.map(zone => { const o = getZoneTime(zone.tz, now).getHours() - now.getHours(); const h = (mHour + o + 48) % 24; return `${fmtH(h, u24)} ${zone.name}`; }).join(" / ") : "Add cities to see conversion"}
                </div>
                <button onClick={() => { if (!zones.length) return; const s = zones.map(z => { const o = getZoneTime(z.tz, now).getHours() - now.getHours(); const h = (mHour + o + 48) % 24; return `${fmtH(h, u24)} ${z.name}`; }).join(" / "); copy(s, "converterstr", "Time string copied! Paste it into Slack or email."); }} className="action-btn">
                  {copiedKey === "converterstr" ? "✓ Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── FAQ ── */}
        <div style={{ marginTop: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.5px" }}>
            Frequently Asked <span style={{ color: "#00c8ff" }}>Questions</span>
          </h2>
          <div style={{ background: "#0c1730", border: "1px solid var(--border2)", borderRadius: 12, padding: "0 20px" }}>
            {FAQ.map((item, i) => (
              <div key={i} className="faq-item">
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{item.q}</span>
                  <span style={{ color: "#00c8ff", fontSize: 20, flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                </div>
                {openFaq === i && <div className="faq-a fade-in">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* ── About / SEO ── */}
        <div style={{ marginTop: 40, padding: 24, background: "#0c1730", border: "1px solid var(--border2)", borderRadius: 12 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12, letterSpacing: "-0.5px" }}>About <span style={{ color: "#00c8ff" }}>ZoneAtlas</span></h2>
          <p style={{ fontSize: 16, color: "#8ba4cc", lineHeight: 1.8, marginBottom: 12 }}>ZoneAtlas is the most complete free world timezone tool built for remote teams, digital nomads, gamers, streamers, and global professionals. Add up to 8 cities and instantly see who is working, awake, or sleeping — so you never schedule a 3am call again.</p>
          <p style={{ fontSize: 16, color: "#8ba4cc", lineHeight: 1.8, marginBottom: 12 }}>Features include live world clocks with public holiday awareness, a Meeting Planner with conflict detection and calendar export, a Team Availability Heatmap, a Discord Timestamp Generator for all 7 Discord time formats, a Recurring Meeting DST Checker, saved team profiles, and an embeddable widget for Notion pages and websites.</p>
          <p style={{ fontSize: 16, color: "#8ba4cc", lineHeight: 1.8 }}>All conversions use your browser's live timezone database for automatic Daylight Saving Time accuracy. No signup required. No data stored on our servers. Free forever.</p>

          {/* VPN affiliate — digital nomads */}
          <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(0,200,255,0.04)", border: "1px solid rgba(0,200,255,0.12)", borderRadius: 10, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 16 }}>🌐</span>
            <span style={{ fontSize: 13, color: "var(--text2)", flex: 1 }}>Working remotely or traveling internationally? Protect your connection with a trusted VPN.</span>
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              <a href="https://nordvpn.com" target="_blank" rel="noopener noreferrer" style={{ padding: "5px 12px", borderRadius: 8, background: "rgba(62,133,251,0.12)", border: "1px solid rgba(62,133,251,0.25)", color: "#6ba3ff", fontSize: 11, fontWeight: 700, textDecoration: "none" }}>NordVPN</a>
              <a href="https://expressvpn.com" target="_blank" rel="noopener noreferrer" style={{ padding: "5px 12px", borderRadius: 8, background: "rgba(218,62,42,0.08)", border: "1px solid rgba(218,62,42,0.2)", color: "#ff7a6b", fontSize: 11, fontWeight: 700, textDecoration: "none" }}>ExpressVPN</a>
            </div>
          </div>
        </div>

        {/* ── Privacy data note ── */}
        <div style={{ marginTop: 20, padding: "12px 16px", background: "rgba(0,200,100,0.04)", border: "1px solid rgba(0,200,100,0.15)", borderRadius: 10, fontSize: 13, color: "#4a6080", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>🔒</span>
          <span>Your saved teams are stored on <strong style={{ color: "#8ba4cc" }}>your device only</strong> — never on our servers. No account required. No personal data collected.</span>
        </div>
      </div>
    </div>
  );
}
