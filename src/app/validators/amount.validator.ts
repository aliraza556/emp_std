import { AbstractControl } from '@angular/forms';

export class AmountValidator{

    public static validate(c:AbstractControl){
        let amount_regex=/^[0-9]*$/;


        return amount_regex.test(c.value) ? null : {
            validateAmount: {
              valid: false
            }
          };
    }

}