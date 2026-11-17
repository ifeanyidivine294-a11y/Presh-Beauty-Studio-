import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Send, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Truck, 
  Store, 
  Copy, 
  Check, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  ShoppingBag, 
  CreditCard,
  Settings,
  ChevronDown
} from 'lucide-react';
import { Product, ProductCategory, CartItem } from '../types';
import { STUDIO_SERVICES } from '../data/services';
import { PRODUCTS } from '../data/products';
import { StateWaybillConfig, BusinessConfig } from '../data/logistics';

interface BookingOrderFormProps {
  initialType?: 'service' | 'product';
  initialServiceId?: string;
  initialProduct?: Product | null;
  initialColor?: string;
  initialSize?: string;
  cartItems?: CartItem[];
  businessConfig: BusinessConfig;
  stateLogistics: StateWaybillConfig[];
  onOpenAdminRates?: () => void;
}

export const BookingOrderForm: React.FC<BookingOrderFormProps> = ({
  initialType = 'service',
  initialServiceId = 'bridal-makeup',
  initialProduct = null,
  initialColor = '',
  initialSize = '',
  cartItems = [],
  businessConfig,
  stateLogistics,
  onOpenAdminRates
}) => {
  // Mode selection: 'service' | 'product' | 'cart'
  const isFromCart = cartItems.length > 0;
  const [formMode, setFormMode] = useState<'service' | 'product' | 'cart'>(
    isFromCart ? 'cart' : initialType
  );

  // Occasion Type for services
  const [occasionType, setOccasionType] = useState<'Personal Makeup' | 'Large Occasion'>('Personal Makeup');

  // Customer Contact Fields
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [homeAddress, setHomeAddress] = useState('');

  // Service Selection
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId);

  // Product Selection (when ordering individual items)
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(
    initialProduct?.category || 'Bags'
  );
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProduct?.id || PRODUCTS[0].id
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    initialColor || initialProduct?.defaultColor || PRODUCTS[0].defaultColor
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    initialSize || (initialProduct?.sizes ? initialProduct.sizes[0] : '38')
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [qualityGrade, setQualityGrade] = useState<'Standard' | 'Premium'>('Premium');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Delivery Method: 'waybill' | 'pickup'
  const [deliveryMethod, setDeliveryMethod] = useState<'waybill' | 'pickup'>('waybill');
  const [destinationState, setDestinationState] = useState<string>(stateLogistics[0]?.state || 'Delta (Asaba Studio Hub)');
  const [destinationTown, setDestinationTown] = useState('');
  const [waybillAddress, setWaybillAddress] = useState('');
  const [nearestBusStop, setNearestBusStop] = useState('');

  // Pickup appointment fields (6:30 AM to 5:00 PM)
  const [pickupDate, setPickupDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [pickupTime, setPickupTime] = useState('10:00');

  // Form Validation & Error state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isCopied, setIsCopied] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Current active product object
  const currentProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const currentService = STUDIO_SERVICES.find((s) => s.id === selectedServiceId) || STUDIO_SERVICES[0];

  // Update selected product when category changes
  const handleCategoryChange = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    const firstInCategory = PRODUCTS.find((p) => p.category === cat) || PRODUCTS[0];
    setSelectedProductId(firstInCategory.id);
    setSelectedColor(firstInCategory.defaultColor);
    if (firstInCategory.sizes) {
      setSelectedSize(firstInCategory.sizes[0]);
    }
  };

  const handleProductChange = (prodId: string) => {
    setSelectedProductId(prodId);
    const prod = PRODUCTS.find((p) => p.id === prodId);
    if (prod) {
      setSelectedCategory(prod.category);
      setSelectedColor(prod.defaultColor);
      if (prod.sizes) {
        setSelectedSize(prod.sizes[0]);
      }
    }
  };

  // Synchronize when initial props change
  useEffect(() => {
    if (initialProduct) {
      setFormMode('product');
      setSelectedProductId(initialProduct.id);
      setSelectedCategory(initialProduct.category);
      setSelectedColor(initialColor || initialProduct.defaultColor);
      if (initialSize) setSelectedSize(initialSize);
    } else if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
      if (!isFromCart) setFormMode('service');
    }
  }, [initialProduct, initialColor, initialSize, initialServiceId]);

  // Calculate waybill fee based on selected state
  const currentWaybillConfig = stateLogistics.find((s) => s.state === destinationState);
  const waybillFee = deliveryMethod === 'waybill' ? (currentWaybillConfig?.defaultFee || 2500) : 0;

  // Calculate Subtotal & Total
  let subtotal = 0;
  if (formMode === 'cart') {
    subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  } else if (formMode === 'product') {
    subtotal = currentProduct.price * quantity;
  } else {
    // Service booking
    const basePrice = occasionType === 'Large Occasion' ? 150000 : currentService.price;
    subtotal = basePrice * quantity;
  }

  const finalTotal = subtotal + waybillFee;

  // Form Validation
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required.';
    } else if (phoneNumber.trim().length < 10) {
      newErrors.phoneNumber = 'Please enter a valid phone number.';
    }

    if (quantity <= 0) newErrors.quantity = 'Quantity must be at least 1.';

    if (deliveryMethod === 'waybill') {
      if (!destinationTown.trim()) newErrors.destinationTown = 'Destination town is required.';
      if (!waybillAddress.trim()) newErrors.waybillAddress = 'Delivery address or waybill park is required.';
      if (!nearestBusStop.trim()) newErrors.nearestBusStop = 'Nearest bus stop is required.';
    } else {
      if (!pickupDate) newErrors.pickupDate = 'Pickup date is required.';
      if (!pickupTime) {
        newErrors.pickupTime = 'Pickup time is required.';
      } else {
        // Enforce 6:30 AM to 5:00 PM Lagos Time
        const [hour, min] = pickupTime.split(':').map(Number);
        const timeInMins = hour * 60 + min;
        const minTime = 6 * 60 + 30; // 06:30
        const maxTime = 17 * 60;     // 17:00
        if (timeInMins < minTime || timeInMins > maxTime) {
          newErrors.pickupTime = 'Studio pickup hours are strictly between 6:30 AM and 5:00 PM.';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = (
    fullName.trim().length > 0 &&
    phoneNumber.trim().length >= 10 &&
    quantity > 0 &&
    (deliveryMethod === 'waybill'
      ? destinationTown.trim().length > 0 && waybillAddress.trim().length > 0 && nearestBusStop.trim().length > 0
      : Boolean(pickupDate) && Boolean(pickupTime))
  );

  // Copy Account Number
  const handleCopyAccount = () => {
    navigator.clipboard.writeText(businessConfig.palmpayAccountNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // WhatsApp Order Submission
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    if (!validateForm()) {
      return;
    }

    // Build properly formatted & URL-encoded order message
    let message = `*NEW BOOKING & ORDER — PRESH BEAUTY STUDIO*\n`;
    message += `-------------------------------------------\n`;
    message += `*Customer:* ${fullName.trim()}\n`;
    message += `*Phone:* ${phoneNumber.trim()}\n`;
    if (email.trim()) message += `*Email:* ${email.trim()}\n`;
    if (homeAddress.trim()) message += `*Home Address:* ${homeAddress.trim()}\n\n`;

    message += `*ORDER DETAILS:*\n`;
    if (formMode === 'cart') {
      message += `*Order Source:* Shopping Bag (${cartItems.length} items)\n`;
      cartItems.forEach((item, idx) => {
        message += `  ${idx + 1}. ${item.name}\n`;
        if (item.color) message += `     - Color: ${item.color}\n`;
        if (item.size) message += `     - Size: ${item.size}\n`;
        message += `     - Qty: ${item.quantity} x ₦${item.price.toLocaleString()} = ₦${(item.price * item.quantity).toLocaleString()}\n`;
      });
    } else if (formMode === 'product') {
      message += `*Type:* Luxury Collection (${currentProduct.category})\n`;
      message += `*Item:* ${currentProduct.name}\n`;
      message += `*Color:* ${selectedColor}\n`;
      if (currentProduct.sizes) {
        message += `*Shoe Size:* ${selectedSize} (EU)\n`;
      }
      message += `*Quantity:* ${quantity}\n`;
      message += `*Quality / Grade:* ${qualityGrade}\n`;
      message += `*Unit Price:* ₦${currentProduct.price.toLocaleString()}\n`;
    } else {
      message += `*Type:* Studio Beauty Service\n`;
      message += `*Occasion Category:* ${occasionType}\n`;
      message += `*Service:* ${currentService.title}\n`;
      message += `*Number of Faces / Sessions:* ${quantity}\n`;
      message += `*Quality / Grade:* ${qualityGrade}\n`;
      message += `*Preferred Date:* ${pickupDate}\n`;
      message += `*Preferred Time:* ${pickupTime}\n`;
    }

    if (additionalNotes.trim()) {
      message += `*Additional Notes:* ${additionalNotes.trim()}\n`;
    }

    message += `\n*DELIVERY / APPOINTMENT:*\n`;
    if (deliveryMethod === 'waybill') {
      message += `*Method:* Waybill Delivery (Inter-state Logistics)\n`;
      message += `*State:* ${destinationState}\n`;
      message += `*Town / City:* ${destinationTown.trim()}\n`;
      message += `*Delivery Address / Park:* ${waybillAddress.trim()}\n`;
      message += `*Nearest Bus Stop:* ${nearestBusStop.trim()}\n`;
      message += `*Waybill Logistics Fee:* ₦${waybillFee.toLocaleString()}\n`;
    } else {
      message += `*Method:* Studio Appointment / Pick Up (Asaba)\n`;
      message += `*Studio Location:* ${businessConfig.pickupAddress}\n`;
      message += `*Date:* ${pickupDate}\n`;
      message += `*Scheduled Arrival Time:* ${pickupTime} (WAT)\n`;
      message += `*Waybill Fee:* ₦0 (Pick Up)\n`;
    }

    message += `\n*PAYMENT SUMMARY:*\n`;
    message += `*Subtotal:* ₦${subtotal.toLocaleString()}\n`;
    message += `*Waybill Fee:* ₦${waybillFee.toLocaleString()}\n`;
    message += `*FINAL TOTAL:* ₦${finalTotal.toLocaleString()}\n`;
    message += `*Payment Method:* ${businessConfig.bankName} (${businessConfig.palmpayAccountName} - ${businessConfig.palmpayAccountNumber})\n`;
    message += `-------------------------------------------\n`;
    message += `_Sent via Presh Beauty Studio web application. Please confirm my order and availability._`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${businessConfig.whatsapp}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div id="booking-order-section" className="relative p-5 sm:p-8 rounded-3xl bg-gradient-to-b from-[#240B1D]/95 to-[#170513]/95 border border-[#FF2A85]/40 shadow-[0_0_35px_rgba(255,42,133,0.2)] backdrop-blur-xl max-w-4xl mx-auto">
      
      {/* Header matching Reference Image */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center justify-center gap-2 text-[#FF2A85] text-sm font-bold uppercase tracking-wider">
          <Calendar className="w-5 h-5 text-[#FF2A85]" />
          <span>Book Us Now</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          Let's Bring Out Your Beauty
        </h2>
        <p className="text-xs sm:text-sm text-[#F8DDE8]/80 max-w-md mx-auto">
          Fill the form below and let's craft your flawless look or dispatch your luxury pieces!
        </p>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 pt-4 flex-wrap">
          <button
            type="button"
            onClick={() => setFormMode('service')}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              formMode === 'service'
                ? 'bg-gradient-to-r from-[#FF1A88] to-[#A80050] text-white shadow-[0_0_15px_rgba(255,26,136,0.5)]'
                : 'bg-white/5 text-[#FFF1F6]/75 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Studio Makeup & Gele Booking</span>
          </button>

          <button
            type="button"
            onClick={() => setFormMode('product')}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              formMode === 'product'
                ? 'bg-gradient-to-r from-[#FF1A88] to-[#A80050] text-white shadow-[0_0_15px_rgba(255,26,136,0.5)]'
                : 'bg-white/5 text-[#FFF1F6]/75 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Fashion & Beauty Items</span>
          </button>

          {isFromCart && (
            <button
              type="button"
              onClick={() => setFormMode('cart')}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                formMode === 'cart'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4D068] text-[#29151F] shadow-lg'
                  : 'bg-white/5 text-[#FAD38D] hover:bg-white/10 border border-white/10'
              }`}
            >
              <span>Bag Items ({cartItems.length})</span>
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleWhatsAppSubmit} className="space-y-6 text-left">
        
        {/* Service Mode Occasion Toggle from Reference Image */}
        {formMode === 'service' && (
          <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-black/40 border border-white/10">
            <button
              type="button"
              onClick={() => setOccasionType('Personal Makeup')}
              className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                occasionType === 'Personal Makeup'
                  ? 'bg-[#FF1A88] text-white shadow-[0_0_12px_rgba(255,26,136,0.6)]'
                  : 'text-[#FFF1F6]/70 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Personal Makeup</span>
            </button>

            <button
              type="button"
              onClick={() => setOccasionType('Large Occasion')}
              className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                occasionType === 'Large Occasion'
                  ? 'bg-[#FF1A88] text-white shadow-[0_0_12px_rgba(255,26,136,0.6)]'
                  : 'text-[#FFF1F6]/70 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Large Occasion</span>
            </button>
          </div>
        )}

        {/* SECTION 1: Customer Contact Info */}
        <div className="space-y-4">
          <p className="text-xs font-bold text-[#FAD38D] uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>1. Customer Information</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-[#FFF1F6] mb-1.5">
                Full Name <span className="text-[#FF2A85]">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Chioma Okeke"
                  className={`w-full py-3 px-4 pl-10 rounded-xl bg-black/40 border text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF1A88] transition ${
                    errors.fullName ? 'border-red-500' : 'border-white/15'
                  }`}
                />
                <User className="w-4 h-4 text-white/50 absolute left-3.5 top-3.5" />
              </div>
              {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-medium text-[#FFF1F6] mb-1.5">
                Phone Number <span className="text-[#FF2A85]">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g. 0801 234 5678"
                  className={`w-full py-3 px-4 pl-10 rounded-xl bg-black/40 border text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF1A88] transition ${
                    errors.phoneNumber ? 'border-red-500' : 'border-white/15'
                  }`}
                />
                <Phone className="w-4 h-4 text-white/50 absolute left-3.5 top-3.5" />
              </div>
              {errors.phoneNumber && <p className="text-[11px] text-red-400 mt-1">{errors.phoneNumber}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-medium text-[#FFF1F6] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. chioma@example.com"
                  className="w-full py-3 px-4 pl-10 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF1A88] transition"
                />
                <Mail className="w-4 h-4 text-white/50 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Home Address */}
            <div>
              <label className="block text-xs font-medium text-[#FFF1F6] mb-1.5">
                Home Address (Optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  placeholder="e.g. Okpanam Road, Asaba"
                  className="w-full py-3 px-4 pl-10 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF1A88] transition"
                />
                <MapPin className="w-4 h-4 text-white/50 absolute left-3.5 top-3.5" />
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: Service or Product Selection */}
        <div className="space-y-4 pt-2 border-t border-white/10">
          <p className="text-xs font-bold text-[#FAD38D] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>2. Selection & Specifications</span>
          </p>

          {/* Cart Review if arrived from Cart */}
          {formMode === 'cart' && (
            <div className="p-4 rounded-2xl bg-black/40 border border-white/15 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#FAD38D] font-bold">
                <span>Items from Your Shopping Bag ({cartItems.length})</span>
                <span className="text-white">Subtotal: ₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.cartId} className="flex items-center justify-between text-xs p-2 rounded-xl bg-white/5">
                    <div className="flex items-center gap-2">
                      <img src={item.image} alt={item.name} className="w-9 h-9 rounded-md object-cover" />
                      <div>
                        <p className="text-white font-medium line-clamp-1">{item.name}</p>
                        <p className="text-[10px] text-[#F8DDE8]/70">
                          {item.color && `Color: ${item.color} `}
                          {item.size && `• Size: ${item.size} `}
                          • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-[#FAD38D]">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Service Mode Fields */}
          {formMode === 'service' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#FFF1F6] mb-1.5">
                  Select Service <span className="text-[#FF2A85]">*</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full py-3 px-4 rounded-xl bg-[#22081B] border border-white/15 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FF1A88] appearance-none cursor-pointer"
                  >
                    {STUDIO_SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} — ₦{s.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-white/60 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#FFF1F6] mb-1.5">
                  Number of People / Faces
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 py-3 px-4 rounded-xl bg-black/40 border border-white/15 text-sm text-white text-center focus:outline-none focus:ring-2 focus:ring-[#FF1A88]"
                  />
                  <span className="text-xs text-[#F8DDE8]/70">
                    Estimated service time: {currentService.duration}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Product Mode Fields (when shopping single item) */}
          {formMode === 'product' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Product Type Dropdown */}
                <div>
                  <label className="block text-xs font-medium text-[#FFF1F6] mb-1.5">
                    Product Type <span className="text-[#FF2A85]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => handleCategoryChange(e.target.value as ProductCategory)}
                      className="w-full py-3 px-4 rounded-xl bg-[#22081B] border border-white/15 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FF1A88] appearance-none cursor-pointer"
                    >
                      <option value="Bags">Bags</option>
                      <option value="Shoes">Shoes</option>
                      <option value="Jewelry">Jewelry</option>
                      <option value="Perfumes">Perfumes</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-white/60 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Product Name Dropdown (updates based on category) */}
                <div>
                  <label className="block text-xs font-medium text-[#FFF1F6] mb-1.5">
                    Product Name <span className="text-[#FF2A85]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedProductId}
                      onChange={(e) => handleProductChange(e.target.value)}
                      className="w-full py-3 px-4 rounded-xl bg-[#22081B] border border-white/15 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FF1A88] appearance-none cursor-pointer"
                    >
                      {PRODUCTS.filter((p) => p.category === selectedCategory).map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} (₦{p.price.toLocaleString()})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-white/60 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Product Color Swatches & Conditional Shoe Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-black/40 border border-white/10">
                
                {/* Colour Swatches */}
                <div>
                  <label className="block text-xs font-medium text-[#FFF1F6] mb-2">
                    Available Colour: <strong className="text-[#FAD38D]">{selectedColor}</strong>
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {currentProduct.colors.map((c) => {
                      const isSelected = selectedColor === c.name;
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#FF1A88] to-[#A80050] text-white ring-2 ring-white shadow-md'
                              : 'bg-white/10 text-white/80 hover:bg-white/20'
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-white/30"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.name}</span>
                          {isSelected && <Check className="w-3 h-3" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Conditional Shoe Size Field (ONLY shown when Category is Shoes!) */}
                {selectedCategory === 'Shoes' && currentProduct.sizes && (
                  <div>
                    <label className="block text-xs font-medium text-[#FFF1F6] mb-2">
                      Shoe Size (EU Standard) <span className="text-[#FF2A85]">*</span>
                    </label>
                    <div className="flex gap-1.5 flex-wrap">
                      {currentProduct.sizes.map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                            selectedSize === sz
                              ? 'bg-[#FF1A88] text-white ring-2 ring-white shadow'
                              : 'bg-white/10 text-white/80 hover:bg-white/20'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="sm:col-span-2 flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-xs text-[#FFF1F6] font-medium">Quantity:</span>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 py-2 px-3 rounded-xl bg-black/50 border border-white/20 text-center text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-[#FF1A88]"
                    />
                    <span className="text-xs text-[#FAD38D] font-bold">
                      ₦{(currentProduct.price * quantity).toLocaleString()}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Quality / Grade Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#FFF1F6] mb-1.5">
                Quality / Grade
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Standard', 'Premium'] as const).map((grade) => (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => setQualityGrade(grade)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      qualityGrade === grade
                        ? 'bg-[#D4AF37] text-[#29151F] font-bold shadow'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {grade} {grade === 'Premium' && '✨'}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-xs font-medium text-[#FFF1F6] mb-1.5">
                Additional Notes (Optional)
              </label>
              <input
                type="text"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="e.g. Skin allergies, specific color theme, call before dispatch"
                className="w-full py-2.5 px-4 rounded-xl bg-black/40 border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF1A88]"
              />
            </div>
          </div>

        </div>

        {/* SECTION 3: Delivery Method & Logistics */}
        <div className="space-y-4 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-[#FAD38D] uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5" />
              <span>3. Delivery Method or Studio Pick Up</span>
            </p>
            {onOpenAdminRates && (
              <button
                type="button"
                onClick={onOpenAdminRates}
                className="text-[11px] text-[#FAD38D]/80 hover:text-[#FAD38D] underline flex items-center gap-1"
                title="Configure Nigerian state waybill rates"
              >
                <Settings className="w-3 h-3" />
                <span>Logistics Rates</span>
              </button>
            )}
          </div>

          {/* Delivery Method Choice: Waybill vs Pick Up */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDeliveryMethod('waybill')}
              className={`p-3.5 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer ${
                deliveryMethod === 'waybill'
                  ? 'bg-gradient-to-r from-[#FF1A88]/20 to-[#A80050]/20 border-[#FF1A88] text-white shadow-[0_0_15px_rgba(255,26,136,0.3)]'
                  : 'bg-black/30 border-white/10 text-white/70 hover:bg-black/50'
              }`}
            >
              <Truck className={`w-5 h-5 shrink-0 ${deliveryMethod === 'waybill' ? 'text-[#FF1A88]' : 'text-white/40'}`} />
              <div>
                <p className="font-bold text-xs sm:text-sm text-white">Waybill Delivery</p>
                <p className="text-[10px] text-[#F8DDE8]/70 mt-0.5">
                  Inter-state dispatch to parks & doorsteps across Nigeria
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setDeliveryMethod('pickup')}
              className={`p-3.5 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer ${
                deliveryMethod === 'pickup'
                  ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#F4D068]/20 border-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-black/30 border-white/10 text-white/70 hover:bg-black/50'
              }`}
            >
              <Store className={`w-5 h-5 shrink-0 ${deliveryMethod === 'pickup' ? 'text-[#FAD38D]' : 'text-white/40'}`} />
              <div>
                <p className="font-bold text-xs sm:text-sm text-white">I Will Pick Up</p>
                <p className="text-[10px] text-[#F8DDE8]/70 mt-0.5">
                  Studio appointment / pickup in Asaba (Free: ₦0)
                </p>
              </div>
            </button>
          </div>

          {/* Option 1: Waybill Delivery Fields */}
          {deliveryMethod === 'waybill' && (
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-4 animate-in fade-in duration-200">
              
              {/* Destination State Dropdown with Live Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#FFF1F6] mb-1.5">
                    Destination State <span className="text-[#FF2A85]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={destinationState}
                      onChange={(e) => setDestinationState(e.target.value)}
                      className="w-full py-3 px-4 rounded-xl bg-[#20071A] border border-white/15 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FF1A88] appearance-none cursor-pointer"
                    >
                      {stateLogistics.map((cfg) => (
                        <option key={cfg.state} value={cfg.state}>
                          {cfg.state} — ₦{cfg.defaultFee.toLocaleString()} ({cfg.deliveryDays})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-white/60 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                  <p className="text-[11px] text-[#FAD38D] mt-1">
                    Estimated Waybill Fee: <strong>₦{waybillFee.toLocaleString()}</strong> ({currentWaybillConfig?.deliveryDays})
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#FFF1F6] mb-1.5">
                    Destination Town / City <span className="text-[#FF2A85]">*</span>
                  </label>
                  <input
                    type="text"
                    value={destinationTown}
                    onChange={(e) => setDestinationTown(e.target.value)}
                    placeholder="e.g. Benin City, Onitsha, Ikeja"
                    className={`w-full py-3 px-4 rounded-xl bg-black/40 border text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF1A88] ${
                      errors.destinationTown ? 'border-red-500' : 'border-white/15'
                    }`}
                  />
                  {errors.destinationTown && <p className="text-[11px] text-red-400 mt-1">{errors.destinationTown}</p>}
                </div>
              </div>

              {/* Delivery Address & Nearest Bus Stop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#FFF1F6] mb-1.5">
                    Delivery Address or Waybill Park <span className="text-[#FF2A85]">*</span>
                  </label>
                  <input
                    type="text"
                    value={waybillAddress}
                    onChange={(e) => setWaybillAddress(e.target.value)}
                    placeholder="e.g. Peace Mass Transit Park or Street Address"
                    className={`w-full py-3 px-4 rounded-xl bg-black/40 border text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF1A88] ${
                      errors.waybillAddress ? 'border-red-500' : 'border-white/15'
                    }`}
                  />
                  {errors.waybillAddress && <p className="text-[11px] text-red-400 mt-1">{errors.waybillAddress}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#FFF1F6] mb-1.5">
                    Nearest Bus Stop / Landmark <span className="text-[#FF2A85]">*</span>
                  </label>
                  <input
                    type="text"
                    value={nearestBusStop}
                    onChange={(e) => setNearestBusStop(e.target.value)}
                    placeholder="e.g. Main Market Roundabout"
                    className={`w-full py-3 px-4 rounded-xl bg-black/40 border text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF1A88] ${
                      errors.nearestBusStop ? 'border-red-500' : 'border-white/15'
                    }`}
                  />
                  {errors.nearestBusStop && <p className="text-[11px] text-red-400 mt-1">{errors.nearestBusStop}</p>}
                </div>
              </div>

            </div>
          )}

          {/* Option 2: Studio Pickup Fields */}
          {deliveryMethod === 'pickup' && (
            <div className="p-4 rounded-2xl bg-black/40 border border-[#D4AF37]/30 space-y-4 animate-in fade-in duration-200">
              
              <div className="p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs text-[#FFF1F6] space-y-1">
                <p className="font-bold text-[#FAD38D] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Studio Location: {businessConfig.pickupAddress}</span>
                </p>
                <p className="text-[#F8DDE8]/80 text-[11px]">
                  Pickup & appointment hours: <strong>6:30 AM – 5:00 PM (Africa/Lagos time)</strong>. Free pickup: ₦0.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#FFF1F6] mb-1.5">
                    When do you intend to come? (Date) <span className="text-[#FF2A85]">*</span>
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full py-3 px-4 rounded-xl bg-[#20071A] border border-white/15 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FF1A88]"
                  />
                  {errors.pickupDate && <p className="text-[11px] text-red-400 mt-1">{errors.pickupDate}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#FFF1F6] mb-1.5">
                    Select Time (6:30 AM – 5:00 PM) <span className="text-[#FF2A85]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      min="06:30"
                      max="17:00"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className={`w-full py-3 px-4 rounded-xl bg-[#20071A] border text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FF1A88] ${
                        errors.pickupTime ? 'border-red-500' : 'border-white/15'
                      }`}
                    />
                    <Clock className="w-4 h-4 text-white/50 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                  {errors.pickupTime && <p className="text-[11px] text-red-400 mt-1">{errors.pickupTime}</p>}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* SECTION 4: Live Order Summary & Total */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#2B0D23] via-[#1E0719] to-[#2B0D23] border border-white/15 space-y-3">
          <p className="text-xs font-bold text-[#FAD38D] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>4. Live Order Calculation</span>
          </p>

          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between text-[#F8DDE8]/80">
              <span>
                {formMode === 'cart'
                  ? `Subtotal (${cartItems.length} items)`
                  : formMode === 'product'
                  ? `${currentProduct.name} (x${quantity})`
                  : `${currentService.title} (${quantity} face/session)`}
              </span>
              <span className="font-semibold text-white">₦{subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-[#F8DDE8]/80">
              <span>
                Logistics ({deliveryMethod === 'waybill' ? destinationState.split(' ')[0] : 'Studio Pick Up'})
              </span>
              <span className="font-semibold text-[#FAD38D]">
                {waybillFee > 0 ? `₦${waybillFee.toLocaleString()}` : '₦0 (Free Pick Up)'}
              </span>
            </div>

            <div className="pt-2 border-t border-white/15 flex justify-between items-center">
              <span className="font-serif text-base sm:text-lg font-bold text-white">Final Total</span>
              <span className="font-serif text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#FF2A85] via-[#FAD38D] to-[#FFE8C2] bg-clip-text text-transparent">
                ₦{finalTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 5: PalmPay Payment Reveal (Only shown once required fields are valid!) */}
        <div className="pt-2">
          {isFormValid ? (
            <div className="p-5 rounded-2xl bg-[#280E21] border border-[#D4AF37]/40 shadow-lg space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#FAD38D] uppercase tracking-wider">
                  <CreditCard className="w-4 h-4 text-[#FAD38D]" />
                  <span>5. Official Payment Details ({businessConfig.bankName})</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FAD38D] text-[10px] font-bold">
                  Verified Account
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[#F8DDE8]/60 text-[10px] block">Bank / Payment Platform</span>
                  <span className="font-bold text-white text-sm">{businessConfig.bankName}</span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[#F8DDE8]/60 text-[10px] block">Account Name</span>
                  <span className="font-bold text-white text-sm">{businessConfig.palmpayAccountName}</span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-[#D4AF37]/30 flex items-center justify-between">
                  <div>
                    <span className="text-[#F8DDE8]/60 text-[10px] block">Account Number</span>
                    <span className="font-mono font-bold text-[#FAD38D] text-base tracking-wider">
                      {businessConfig.palmpayAccountNumber}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAccount}
                    className="p-2 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 text-[#FAD38D] transition flex items-center gap-1 cursor-pointer"
                    title="Copy Account Number"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isCopied && (
                <p className="text-center text-[11px] text-emerald-400 font-semibold animate-in fade-in">
                  ✓ Account number copied to clipboard!
                </p>
              )}

              <p className="text-[11px] text-[#F8DDE8]/70 text-center">
                Please make your payment or transfer, then click the button below to submit your order summary and receipt on WhatsApp.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-[#F8DDE8]/70">
              <AlertCircle className="w-4 h-4 text-[#FAD38D] shrink-0" />
              <span>
                Please fill in your name, valid phone number, and delivery destination above to reveal the verified {businessConfig.bankName} payment details and submit your order.
              </span>
            </div>
          )}
        </div>

        {/* SECTION 6: WhatsApp Submission Button */}
        <div className="space-y-3 pt-3">
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF1A88] via-[#E01272] to-[#A80050] text-white font-bold text-base sm:text-lg shadow-[0_0_30px_rgba(255,26,136,0.5)] hover:shadow-[0_0_40px_rgba(255,26,136,0.7)] hover:brightness-110 active:scale-[0.99] transition flex items-center justify-center gap-3 cursor-pointer"
          >
            <Send className="w-5 h-5 text-white" />
            <span>Send Order on WhatsApp</span>
          </button>

          <p className="text-center text-[11px] text-[#F8DDE8]/60">
            Clicking will launch WhatsApp with your pre-formatted order details. Please tap <strong>Send</strong> in WhatsApp to finalize your booking with our team.
          </p>
        </div>

      </form>
    </div>
  );
};
