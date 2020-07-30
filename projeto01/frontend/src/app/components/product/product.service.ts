import { map, catchError } from "rxjs/operators";
import { Product } from "./product.model";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Observable, EMPTY } from "rxjs";
@Injectable({
    providedIn: "root",
})
export class ProductService {
    baseURL = "http://localhost:3001/products";
    constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

    showMessage(msg: string, isError: boolean = false): void {
        this.snackBar.open(msg, "x", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: isError ? ["msg-error"] : ["msg-success"],
        });
    }
    create(product: Product): Observable<Product> {
        return this.http.post<Product>(this.baseURL, product).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandler(e))
        );
    }

    read(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseURL).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandler(e))
        );
    }
    readById(id: number): Observable<Product> {
        const URL = `${this.baseURL}/${id}`;
        return this.http.get<Product>(URL).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandler(e))
        );
    }
    update(product: Product): Observable<Product> {
        const URL = `${this.baseURL}/${product.id}`;
        return this.http.put<Product>(URL, product).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandler(e))
        );
    }
    delete(id: number): Observable<Product> {
        const URL = `${this.baseURL}/${id}`;
        return this.http.delete<Product>(URL).pipe(
            map((obj) => obj),
            catchError((e) => this.errorHandler(e))
        );
    }
    errorHandler(e: any): Observable<any> {
        this.showMessage("Ocorreu um erro!", true);
        return EMPTY;
    }
}
