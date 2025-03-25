package com.microservice.common.utils.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaginationParams {
    @Min(value = 0, message = "page debe ser 0 o superior")
    private int page = 0;
    @Min(value = 1, message = "size debe ser mayor a 0")
    private int size = 10;
    @Pattern(regexp = "^[a-zA-Z0-9_]+,(asc|desc)$", message = "Formato de sort inválido. Debe ser 'campo,sort' donde sort es 'asc' o 'desc'.")
    private String sort = "id,asc";

}
