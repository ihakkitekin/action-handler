# action-handler

# Nedir?
Belirli bir değişkene ya da ortama bağlı olarak benzer kodların tekrarladığı durumlarda, if-else statementlarının azaltılmasını amaçlar.

# API
Basitçe bir handler şu şekilde oluşturulabilir:</br>
<code>const handler = new Handler&lt;T&gt;(options);</code></br>
<code>T</code> handlerın kontrol etmesini istediğiniz typedır.
Options is belirli parametreler kabul eden bir objedir.


| Options           | Type        | Description                                                  |
| ----------------- |:-----------:| ------------------------------------------------------------:|
| applicants        | array of T  | Kıstasın belirlenmesinde kullanılacak elementler.            |
| identifier        | T           | O an ki statei ifade eden kıstas                             |
| defaultIdentifier | T           | Verilen ıstasın tanımsız olduğu durumlarda ki default kıstas |
| identifierProp    | strıng      | Kıstastı karşılaştırmakta kullanılcak property ismi          |

| Methods           | Parameters          | Description                                                               |
| ----------------- |:-------------------:| -------------------------------------------------------------------------:|
| get               | string              | Tek bir string parametresi alır. O parametreye karşı gelen değeri döner.  |
| injectArgument    | string              | Bir fonksiyona verilen parametreye ait değerin inject eder.               |
| register&lt;T&gt; | string, array of T  | Bir string ve T array parametresi alır. Belirlenmiş kıstasa karşı düşen değeri handlera ekler |

# Example

İlk olarak bir handler oluşturulur ve belirli parametreler register edilir.

```typescript
// handler.ts
import Handler from 'action-handler';

type Storefront = {
  storefront: string;
  id: number;
};

const options = {
  applicants: [{ storefront: 'TR', id: 1 }, { storefront: 'DE', id: 2 }],
  identifier: { storefront: 'TR', id: 1 },
  identifierProp: 'id',
};

const handler = new Handler<Storefront>(options);

const item1 = 'item1';
const item2 = 'item2';

handler.register<string>('item', item1, item2);
handler.register<string>('item2', item1, item2);

export default handler;
```

Daha sonra method tanımlarken kullanılabilir(test bir class methodudur).

```typescript
@handler.injectArgument('item') // first executed
@handler.injectArgument('item2') // second executed
public test(
  item?: any,
  item2?: any,
): void {
  console.log('test is called with: ', item, item2);
}
```

