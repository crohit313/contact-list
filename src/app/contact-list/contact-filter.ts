import { Injectable, Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "contactFilter"
})
@Injectable()
export class ContactFilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any[] {
    if (!items) {
      return [];
    } else {
      if (value) {
        return items.filter(it =>
          it[field].toLowerCase().includes(value.toLowerCase())
        );
      } else {
        return items;
      }
    }
  }
}
