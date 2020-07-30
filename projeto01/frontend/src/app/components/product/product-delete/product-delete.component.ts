import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { ProductService } from "./../product.service";
import { Product } from "./../product.model";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-product-delete",
    templateUrl: "./product-delete.component.html",
    styleUrls: ["./product-delete.component.css"],
})
export class ProductDeleteComponent implements OnInit {
    product: Product = {
        name: "",
        price: null,
    };

    constructor(
        private productService: ProductService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}
    deleteProduct(): void {
        const id = this.product.id;
        this.productService.delete(id).subscribe((product) => {
            this.productService.showMessage("Produto excluído!");
            this.router.navigate(["/products"]);
        });
    }
    cancel(): void {
        this.router.navigate(["/products"]);
    }
    ngOnInit(): void {
        const id = +this.activatedRoute.snapshot.paramMap.get("id");
        this.productService.readById(id).subscribe((product) => {
            this.product = product;
        });
    }
}
