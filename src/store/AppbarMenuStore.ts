import { Module, getModule, VuexModule, Mutation } from 'vuex-module-decorators'
import store from '@/store'

@Module({
  dynamic: true,
  store,
  name: 'AppbarMenuStore'
})
class AppbarMenuStore extends VuexModule {
  private _items: Array<MenuItem> = []

  @Mutation
  public setItems (items: Array<MenuItem>) {
    this._items = items
  }

  @Mutation
  public clean () {
    this._items = []
  }

  public get isShow () {
    return this.items.length > 0
  }

  public get items () {
    return this._items
  }
}

interface MenuItem {
  title: string;
  icon: string;
  action?: () => void;
}

export default getModule(AppbarMenuStore)
