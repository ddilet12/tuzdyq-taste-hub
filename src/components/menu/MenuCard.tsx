import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';
import { ui } from '@/data/translations';
import type { MenuItem } from '@/data/menuItems';
import { categoryImages, fallbackImage } from '@/data/categoryImages';
import { Plus, Minus } from 'lucide-react';

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { lang } = useLang();
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find(ci => ci.item.id === item.id);
  const qty = cartItem?.quantity || 0;

  const formatPrice = (p: number) => p.toLocaleString('ru-RU') + ' ' + ui.currency[lang];
  const img = categoryImages[item.category] || fallbackImage;

  return (
    <div className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-colors">
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={img}
          alt={item.name[lang]}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-3 flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2 min-h-[2.5rem]">
          {item.name[lang]}
        </h3>
        {item.description?.[lang] && (
          <p className="text-xs text-muted-foreground line-clamp-2">{item.description[lang]}</p>
        )}
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-primary font-bold text-sm">{formatPrice(item.price)}</span>
          <div className="flex items-center gap-1.5 shrink-0">
            {qty > 0 ? (
              <>
                <button onClick={() => updateQuantity(item.id, qty - 1)}
                  className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-5 text-center text-xs font-semibold text-foreground">{qty}</span>
                <button onClick={() => addItem(item)}
                  className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/80 transition-colors">
                  <Plus className="w-3 h-3" />
                </button>
              </>
            ) : (
              <button onClick={() => addItem(item)}
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/80 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
