import { MapPinIcon } from '@heroicons/react/24/outline';

const subnav = [
    {
        name: "Chọn rạp",
        icon: MapPinIcon,
    },
    {
        name: "Khuyến mãi",
        to: '/Test'
    },
    {
        name: "Giới thiệu",
        to: '/about'
    }
    
];

const listTheater = [
    "Cinestar Quốc Thanh (TPHCM)",
    "Cinestar Hai Bà Trưng (TPHCM)",
    "Cinestar Sinh viên (Bình Dương)",
    "Cinestar Huế",
    "Cinestar Đà Lạt",
    "Cinestar Lâm Đồng",
    "Cinestar Mỹ Tho",
    "Cinestar Kiên Giang",
]

export { subnav, listTheater };
