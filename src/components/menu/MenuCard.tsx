import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';
import { ui } from '@/data/translations';
import type { MenuItem } from '@/data/menuItems';
import { Plus, Minus } from 'lucide-react';

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { lang } = useLang();
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find(ci => ci.item.id === item.id);
  const qty = cartItem?.quantity || 0;

  const formatPrice = (p: number) => p.toLocaleString('ru-RU') + ' ' + ui.currency[lang];

  return (
    <div className="group rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
      <div className="p-3.5 flex flex-col gap-2">

        <h3 className="text-[15px] font-semibold text-foreground leading-snug line-clamp-2 min-h-[2.75rem]">
          {item.name[lang]}
        </h3>
        {item.description?.[lang] && (
          <p className="text-[13px] text-muted-foreground line-clamp-2">{item.description[lang]}</p>
        )}
        <div className="flex items-center justify-between mt-1">
          <span className="text-primary font-bold text-[15px]">{formatPrice(item.price)}</span>
          <div className="flex items-center gap-2 shrink-0">
            {qty > 0 ? (
              <>
                <button onClick={() => updateQuantity(item.id, qty - 1)}
                  className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors active:scale-90">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center text-sm font-semibold text-foreground">{qty}</span>
                <button onClick={() => addItem(item)}
                  className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/80 transition-colors active:scale-90">
                  <Plus className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button onClick={() => addItem(item)}
                className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/80 transition-colors active:scale-90">
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
