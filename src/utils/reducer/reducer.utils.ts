import { AnyAction } from "redux";

type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  //Matchable에 들어온 AC은 항상 type 값을 가진다 -> dispatch({type:CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: !isCartopen })
  //Matchable에서 이 type 값을 가지고 있기를 원해서 type의 타입은 ReturnType<AC>이고
  // 그 AC 즉 ActionCreator 에서 type 값을 가진다는 의미이다.
  match(action: AnyAction): action is ReturnType<AC>;
  // "is" operator가 parameter로 들어온 action이 AC 타입을 반환하는지 안하는지를 boolean으로 알려줌
};
// AnyAction은 말그대로 어떤 타입이던 가지고 있는 action이 올 수 있다는 뜻

export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

// createAction은 type은 무조건 파라미터로 받지만 payload는 받기도하고 안받기도 하기 때문에
// payload를 받는경우와 안받는 경우 두가지에 대해 따로 타입을 지정해줘야한다.

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

// export const createAction = (type, payload) => ({ type,payload });
//
//

/* return type

type Human = {
  name: string;
};
type MyFunc = () => Human;
type MyReturn = ReturnType<MyFunc>;

//  ReturnType<> 이라고 쓰면 <>안의 타입을 가지는 타입으로 정의할 수 있게 해준다.
//  위 예시처럼 ReturnType에 들어가는 type은 function으로 타입을 리턴해야한다.
*/

/* intersection type

 type Alien = {
  fly: () => void;
}
type Human = {
  name: string
}
type Hybrid = Human & Alien; // & 는 intersection type 이다.

const Josh: Hybrid = {
  name: 'josh',
  fly: () => {}
}
 // => 두개의 다른 타입을 가질 수 있게 해주는 타입이 intersection type이다.
 */
