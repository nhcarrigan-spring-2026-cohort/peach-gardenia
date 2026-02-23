import React, { cloneElement } from "react";
import { toCamelCase } from "../../helpers/camelCase";
import { toKebabCase} from "../../helpers/kebabCase";
import { inferTypeFromName} from "../../helpers/inputType";

export function FormLabel({ name, autocomplete, required, maxLength, children }) {
    const id = toKebabCase(name);
    const elementName = toCamelCase(name);

    const injectedChildren = React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child

        return cloneElement(child, {
            id: child.props.id ?? id,
            name: child.props.name ?? elementName,
            autoComplete: child.props.autoComplete ?? autocomplete,
            required: child.props.required ?? required,
            maxLength: child.props.maxLength ?? maxLength,
            type: child.props.type ?? inferTypeFromName(name)
        })
    })

    return (
        <label htmlFor={id}>{name} {required ? "*" : ""}:
            {injectedChildren}
        </label>

    )
}