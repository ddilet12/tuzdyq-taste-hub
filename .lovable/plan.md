## Проблема
Логотип в шапке обрезается: `max-h-48` ограничивает высоту в 192px, а `object-cover` заполняет этот прямоугольник, срезая верх и низ квадратного изображения.

## Изменения
Файл: `src/components/menu/Header.tsx`

Заменить классы у `<img>` логотипа:
- Убрать: `max-h-48`, `object-cover`
- Добавить: `h-auto`, `object-contain`

Итог: `className="w-full max-w-sm h-auto rounded-2xl border border-primary/40 object-contain mb-3 shadow-lg"`

Логотип будет показан целиком в естественных пропорциях.